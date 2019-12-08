
BUCKET_URL = "https://storage.googleapis.com/emission-data"

def get_times(from_year, to_year, from_month, to_month):
    # dataset, from_/to_year and from_/to_month are assumed to be valid
    times = {}

    for year in range(from_year, to_year + 1):
        times[year] = []
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
            times[year].append(month)

    return times
