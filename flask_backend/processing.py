
BUCKET_URL = "https://storage.googleapis.com/emission-data"

def dataset_query_to_nc_url(dataset, year, month):
    # dataset, year and month are assumed to be valid
    return BUCKET_URL + f"/{dataset}_{year}_{month}.nc"

def collection_query_to_nc_urls(dataset, from_year, to_year, from_month, to_month):
    # dataset, from_/to_year and from_/to_month are assumed to be valid
    urls = []

    for year in range(from_year, to_year + 1):
        if year > from_year:
            this_from_month = 1
        else:
            this_from_month = from_month
        if year < to_year:
            this_to_month = 12
        else:
            this_to_month = to_month
        print(year, from_month, to_month)
        for month in range(this_from_month, this_to_month + 1):
            urls.append(BUCKET_URL + f"/{dataset}_{year}_{month}.nc")

    return urls


def process_json(urls_list_to_nc_files=[]):
    if len(urls_list_to_nc_files) == 0:
        return []
    elif len(urls_list_to_nc_files) == 1:
        return [1]
    else:
        return [[1], [2]]
