import urllib.request
import shutil
import os
import csv
import netCDF4 as nc
import numpy as np
import json

import ssl

if not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
    ssl._create_default_https_context = ssl._create_unverified_context


def _transform_ODIAC(dataset, months):
    """Transform ODIAC netCDF files to json"""
    records_full = []
    for month in months:
        print('Construct empty emission matrix')
        emission_matrix_1_0 = np.zeros([180, 360], dtype=np.float64)
        emission_matrix_1_0[:][:] = dataset["land"][month - 1][:][:]

        print('Normalize')
        emission_matrix_1_0 *= 1 / emission_matrix_1_0.max()  # normalize

        print('Construct record')
        records = []
        for new_lat_index in range(180):
            for new_lon_index in range(360):
                tmp = emission_matrix_1_0[new_lat_index][new_lon_index]
                if tmp > 0.01:
                    records.append({
                        "coordinates": [new_lat_index + 0.5 - 90, (new_lon_index + 0.5 - 180)],
                        "value": tmp
                    })
        records_full.append(records)
    return records_full


def _transform_EDGAR(dataset):
    """Transform EDGAR netCDF files to json"""
    print('Construct empty emission matrix')
    emission_matrix_0_1 = np.zeros([1800, 3600], dtype=np.float64)
    emission_matrix_1_0 = np.zeros([180, 360], dtype=np.float64)
    emission_matrix_0_1[:][:] = dataset['emi_co2'][:][:]

    print("Scale down by 10")
    for new_lat_index in range(180):
        for new_lon_index in range(360):
            emission_matrix_1_0[new_lat_index][new_lon_index] = np.average(
                [row[new_lon_index * 10:(new_lon_index + 1) * 10] for row in
                 emission_matrix_0_1[new_lat_index * 10:(new_lat_index + 1) * 10]])

    print('Normalize')
    emission_matrix_1_0 *= 1 / emission_matrix_1_0.max()  # normalize

    print('Construct record')
    records = []
    for new_lat_index in range(180):
        for new_lon_index in range(360):
            tmp = emission_matrix_1_0[new_lat_index][new_lon_index]
            if tmp > 0.01:
                records.append({
                    "coordinates": [new_lat_index + 0.5 - 90, (new_lon_index + 0.5 - 180)],
                    "value": tmp
                })
    return records


def get_json_from_url(org, url, months=None):
    """Give url, get fancy json from them netCDF fiiiiiiiles"""
    print('Download netCDF file')
    bufferpath = 'tmp.nc'  # path were the nc file is saved temporarily and deleted after use
    with urllib.request.urlopen(url) as response, open(bufferpath, 'wb') as outfile:
        shutil.copyfileobj(response, outfile)

    print('Read netCDF file')
    ds = nc.Dataset(bufferpath, "r", format="NETCDF4")
    records = _transform_EDGAR(ds) if org == 'edgar' else _transform_ODIAC(ds, months)

    # print("Dumping to json")
    # with open('out.json', 'w') as outfile:
    #    json.dump(r, outfile)

    print('Close and remove netCDF file')
    ds.close()
    os.remove(bufferpath)

    return records


def get_records(org, ym):
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
    if org == 'edgar':
        for year in years:  # edgar files only have years
            records_full.append(get_json_from_url(org, '%s%s_%s.nc' % (begin, org, str(year))))
    else:
        for year in years:
            records_full += get_json_from_url(org, '%s%s_%s.nc' % (begin, org, str(year)), ym[year])
    return {"Status": "Ok",
            "Datasets": records_full}, 200


# HOW TO USE
if __name__ == "__main__":
    records = get_records(
        'edgar',
        {
            2014: [9, 10, 11, 12],
            2015: [1, 2, 3]
        }
    )
