import pandas as pd
import numpy as np

#Reads given csv
df = pd.read_csv('C:/Users/chris/Desktop/test7.csv', dtype='unicode')
source_cols = ['awarding_agency_code', 'awarding_agency_name', 'awarding_office_code', 
'awarding_office_name', 'foreign_funding']
source = df[source_cols]
source_final = source.groupby(by=['awarding_agency_code', 'awarding_agency_name', 'awarding_office_code', 
'awarding_office_name', 'foreign_funding']).max().reset_index()
source_final.to_csv('C:/Users/chris/Desktop/testsource.csv', index = False)
