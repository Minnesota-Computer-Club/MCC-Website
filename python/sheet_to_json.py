from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import os, json, string, socket
import sys

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The IDs of the form response spreadsheets (which are private)
SHEET_IDS = {
    "MCC": '1xGcA-g07NEwU8utlOYr5Ym6cZlNw6jKePU5YNTtECqg', 
    "RCC": '1jvgrPyjEA95QY2xyGXamMGA-yckRbRySp9o1DRtW-2I'
}

# Exclude email and t-shirt size cols
EXCLUDED_COLS = {'Email Address', 'What is your t-shirt size?'}

# Path to the token can be passed as an argument
TOKENPATH = sys.argv[1] if len(sys.argv) >= 2 else (os.path.expanduser("~")+'/google-token.json')

IS_SERVER = socket.gethostname() == 'mncomputerclub.com'

OUTPUT_FILES = {
    "MCC": "/var/www/MCC-Website/python/users_mn.json" if IS_SERVER else "./users_mn.json",
    "RCC": "/var/www/MCC-Website/python/users_roch.json" if IS_SERVER else "./users_roch.json"
}

# Download a google sheet and convert it to JSON which is returned as a python object
def respsheet2json(svc, sheetID):
    # Get the sheet containing the responses
    sheet = svc.spreadsheets()
    result = sheet.values().get(spreadsheetId=sheetID,
                                range='Form Responses 1').execute()
    values = result.get('values', [])
    
    colnames, rows = values[0], values[1:]

    if not values:
        print('ERROR: No data found in sheet')
        exit(1)

    users_json = {}
    excluded_colis = [colnames.index(colname) for colname in EXCLUDED_COLS]

    for row in rows:
        user = {}
        for coli in range(len(colnames)):
            if coli in excluded_colis: continue
            else:
                if (coli >= len(row)): 
                    user[colnames[coli]] = ""
                else:
                    user[colnames[coli]] = row[coli]
        users_json[user["What is your Advent of Code Username? (Make sure you are logged in to see it!)"]] = user
        
    # Do a little data-massaging to clean up the high school names
    for k in users_json.keys():
        hsname: str = users_json[k]["Which school do you attend?"].lower()
        for hs in ["high school", "high shcool", "highschool", "highshcool"]:
            hsname = hsname.replace(hs, "")

        users_json[k]["Which school do you attend?"] = string.capwords(hsname)
        
    return users_json
        

def main():
    ######### CREDENTIALS
    creds = None
    if os.path.exists(TOKENPATH):
        creds = Credentials.from_authorized_user_file(TOKENPATH, SCOPES)
        
    # User login to generate tokens
    # if not creds or not creds.valid:
    #     if creds and creds.expired and creds.refresh_token:
    #         creds.refresh(Request())
    #     else:
    #         flow = InstalledAppFlow.from_client_secrets_file(
    #             'credentials.json', SCOPES)
    #         creds = flow.run_local_server(port=0)
    #     # Save the credentials for the next run
    #     with open(TOKENPATH, 'w') as token:
    #         token.write(creds.to_json())
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print("Error, token irrepairable")
            exit(1)

    ######### API CALLS
    service = build('sheets', 'v4', credentials=creds)
    
    mcc_json = respsheet2json(service, SHEET_IDS["MCC"])
    rcc_json = respsheet2json(service, SHEET_IDS["RCC"])
    
    ######### WRITE FILES
    with open(OUTPUT_FILES["RCC"], 'w', encoding='utf-8') as jsonf:
        json.dump(rcc_json, jsonf, indent=2)
        jsonf.close()
        
    with open(OUTPUT_FILES["MCC"], 'w', encoding='utf-8') as jsonf:
        json.dump(mcc_json, jsonf, indent=2)
        jsonf.close()

if __name__ == '__main__':
    main()