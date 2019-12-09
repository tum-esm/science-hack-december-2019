import urllib.request
import shutil
import os
import csv
import netCDF4 as nc
import numpy as np
import json
import ssl
import time


if not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
    ssl._create_default_https_context = ssl._create_unverified_context


def _scale(m, factor):
    """scales numpy matrix m by factor"""
    a, b = m.shape
    if a % factor != 0 or b % factor != 0:
        print('Invalid scaling factor!')
        exit(1)
    mscld = np.zeros([a//factor, b//factor], dtype=np.float64)
    for new_lat_index in range(a//factor):
        for new_lon_index in range(b//factor):
            mscld[new_lat_index][new_lon_index] = np.average([row[new_lon_index*factor:(new_lon_index+1)*factor] for row in m[new_lat_index*factor:(new_lat_index+1)*factor]])
    return mscld

def _transform_ODIAC(dataset, months, scale=1):
    """Transform ODIAC netCDF files to json"""
    records_full = []
    maximum_l = []
    for month in months:
        print('Construct empty emission matrix')
        emission_matrix_1_0 = np.zeros([180, 360], dtype=np.float64)
        emission_matrix_1_0[:][:] = dataset["land"][month-1][:][:]

        if scale > 1:
            print("Scale down")
            matrix_scaled = _scale(emission_matrix_1_0, scale)
        else:
            matrix_scaled = emission_matrix_1_0

        print('Normalize')
        maximum = matrix_scaled.max()
        maximum_l.append(maximum)
        matrix_scaled *= 1/maximum  # normalize

        print('Construct record')
        records = []
        for new_lat_index in range(180//scale):
            for new_lon_index in range(360//scale):
                tmp = matrix_scaled[new_lat_index][new_lon_index]
                if tmp > 0.01:
                    records.append({
                        "coordinates": [new_lat_index + 0.5 - 90, (new_lon_index + 0.5 - 180)],
                        "value": tmp
                    })
        records_full.append(records)
    return records_full, maximum_l


def _transform_EDGAR(dataset, scale=1):
    """Transform EDGAR netCDF files to json"""
    print('Construct empty emission matrix')
    emission_matrix_0_1 = np.zeros([1800, 3600], dtype=np.float64)
    emission_matrix_0_1[:][:] = dataset['emi_co2'][:][:]

    scale *= 10
    print("Scale down")
    emission_matrix_1_0 = _scale(emission_matrix_0_1, scale)

    print('Normalize')
    maximum = emission_matrix_1_0.max()
    emission_matrix_1_0 *= 1/maximum  # normalize

    print('Construct record')
    records = []
    for new_lat_index in range(1800//scale):
        for new_lon_index in range(3600//scale):
            tmp = emission_matrix_1_0[new_lat_index][new_lon_index]
            if tmp > 0.01:
                records.append({
                    "coordinates": [new_lat_index + 0.5 - 90, (new_lon_index + 0.5 - 180)],
                    "value": tmp
                })
    return records, maximum


def get_json_from_url(org, url, months=None, scale=1):
    """Give url, get fancy json from them netCDF fiiiiiiiles"""
    print('Download netCDF file')
    bufferpath = 'tmp.nc'  # path were the nc file is saved temporarily and deleted after use
    with urllib.request.urlopen(url) as response, open(bufferpath, 'wb') as outfile:
        shutil.copyfileobj(response, outfile)

    print('Read netCDF file')
    ds = nc.Dataset(bufferpath, "r", format="NETCDF4")
    records, maximum = _transform_EDGAR(ds, scale) if org=='edgar' else _transform_ODIAC(ds, months, scale)

    print('Close and remove netCDF file')
    ds.close()
    os.remove(bufferpath)

    return records, maximum


def get_records(org, ym, scale=1):
    """get records from organisation org

    ym format:
        {
            2015: [9, 10, 11, 12],
            2016: [1, 2, 3]
        }
    """
    org = org.lower()
    begin = 'https://storage.googleapis.com/emission-data/'
    records_full = []
    years = list(ym.keys())
    years.sort(reverse=False)
    maximum_l = []
    if org == 'edgar':
        for year in years:  # edgar files only have years
            tt, mm = get_json_from_url(
                org,
                '%s%s_%s.nc' % (begin, org, str(year)),
                scale
            )
            records_full.append(tt)
            maximum_l.append(mm)
    else:
        for year in years:
            tt, mm = get_json_from_url(
                org,
                '%s%s_%s.nc' % (begin, org, str(year)),
                ym[year],
                scale
            )
            records_full += tt
            maximum_l += mm
    # maximum umrechnen in micro gram/m^2/second
    if org == 'edgar':
        # netCDF edgar values are provided in kg CO2/m^2/s
        for i in range(len(maximum_l)):
            maximum_l[i] = maximum_l[i] * 1000000000
    else:
        # netCDF odiac values are provided in gram carbon/m^2/day (monthly mean) of CO2
        for i in range(len(maximum_l)):
            maximum_l[i] = maximum_l[i] * 1000000 / 86400
    print(maximum_l)
    return {
        "Status": "Ok",
        "Datasets": records_full,
        "Maximum": maximum_l,
    }, 200


if __name__ == "__main__":
    # for testing
    records = get_records(
        'odiac',
        {
            2013: [1, 2, 3],
            2014: [1, 2, 3],
        },
        3
    )

