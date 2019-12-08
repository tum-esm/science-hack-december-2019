from flask_restful import Resource
from flask import request

from flask_backend import processing

def get_params_dict(request):
    query_string_list = request.query_string.decode().split("&")
    params_dict = {}

    for query_string_element in query_string_list:

        element_list = query_string_element.split("=")

        if len(element_list) != 2:
            continue

        element_list[0] = element_list[0].strip()
        element_list[1] = element_list[1].strip()
        if len(element_list[0]) == 0 or len(element_list[1]) == 0:
            continue

        if "," in element_list[1]:
            element_list[1] = list(filter(lambda x: len(x) != 0, element_list[1].split(",")))

        if element_list[1] in ["true", "True", "TRUE"]:
            element_list[1] = True
        elif element_list[1] in ["false", "False", "FALSE"]:
            element_list[1] = False

        params_dict[element_list[0]] = element_list[1]

    return params_dict


class RESTDataset(Resource):
    def get(self):
        params_dict = get_params_dict(request)

        # Evaluating parameter "dataset"

        if "dataset" not in params_dict:
            return {"Status": "Missing parameter: dataset"}, 400
        else:
            dataset = params_dict["dataset"].lower()
        if dataset not in ["odiac", "edgar"]:
            return {"Status": "Wrong parameter: dataset has to be either \"odiac\" or \"edgar\""}, 400

        # Evaluating parameter "year"

        if "year" not in params_dict:
            return {"Status": "Missing parameter: year"}, 400
        else:
            if not params_dict["year"].isdigit():
                return {"Status": "Wrong parameter: year has to be an integer"}, 400
            else:
                year = int(params_dict["year"])
        if year < 2000 or 2018 < year:
            return {"Status": "Wrong parameter: year has to be in range [2000 ... 2018]"}, 400

        # Evaluating parameter "month"

        if "month" not in params_dict:
            return {"Status": "Missing parameter: month"}, 400
        else:
            if not params_dict["month"].isdigit():
                return {"Status": "Wrong parameter: month has to be an integer"}, 400
            else:
                month = int(params_dict["month"])

        if month < 1 or 12 < month:
            return {"Status": "Wrong parameter: month has to be in range [1 ... 12]"}, 400

        return {"Status": "Ok",
                "Datasets": processing.dataset_query_to_nc_url(dataset, year, month),
                "params_dict": params_dict}, 200


class RESTDatasetCollection(Resource):
    def get(self):
        params_dict = get_params_dict(request)

        # Evaluating parameter "dataset"

        if "dataset" not in params_dict:
            return {"Status": "Missing parameter: dataset"}, 400
        else:
            dataset = params_dict["dataset"].lower()
        if dataset not in ["odiac", "edgar"]:
            return {"Status": "Wrong parameter: dataset has to be either \"odiac\" or \"edgar\""}, 400

        # Evaluating parameter "from_year"

        if "from_year" not in params_dict:
            return {"Status": "Missing parameter: from_year"}, 400
        else:
            if not params_dict["from_year"].isdigit():
                return {"Status": "Wrong parameter: from_year has to be an integer"}, 400
            else:
                from_year = int(params_dict["from_year"])
        if from_year < 2000 or 2018 < from_year:
            return {"Status": "Wrong parameter: from_year has to be in range [2000 ... 2018]"}, 400

        # Evaluating parameter "to_year"

        if "to_year" not in params_dict:
            return {"Status": "Missing parameter: to_year"}, 400
        else:
            if not params_dict["to_year"].isdigit():
                return {"Status": "Wrong parameter: to_year has to be an integer"}, 400
            else:
                to_year = int(params_dict["to_year"])
        if to_year < 2000 or 2018 < to_year:
            return {"Status": "Wrong parameter: to_year has to be in range [2000 ... 2018]"}, 400

        # Evaluating parameter "from_month"

        if "from_month" not in params_dict:
            return {"Status": "Missing parameter: from_month"}, 400
        else:
            if not params_dict["from_month"].isdigit():
                return {"Status": "Wrong parameter: from_month has to be an integer"}, 400
            else:
                from_month = int(params_dict["from_month"])
        if from_month < 1 or 12 < from_month:
            return {"Status": "Wrong parameter: from_month has to be in range [1 ... 12]"}, 400

        # Evaluating parameter "to_month"

        if "to_month" not in params_dict:
            return {"Status": "Missing parameter: to_month"}, 400
        else:
            if not params_dict["to_month"].isdigit():
                return {"Status": "Wrong parameter: to_month has to be an integer"}, 400
            else:
                to_month = int(params_dict["to_month"])
        if to_month < 1 or 12 < to_month:
            return {"Status": "Wrong parameter: to_month has to be in range [1 ... 12]"}, 400

        return {"Status": "Ok",
                "Datasets": processing.collection_query_to_nc_urls(dataset, from_year, to_year, from_month, to_month),
                "params_dict": params_dict}, 200
