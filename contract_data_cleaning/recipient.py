import pandas as pd
import numpy as np

#Reads given csv
df = pd.read_csv('C:/Users/chris/Desktop/test7.csv', dtype='unicode')
recipient_cols = [ 'recipient_name', 'city_local_government', 'county_local_government', 'emerging_small_business', 'federal_agency', 'for_profit_organization', 
'foreign_government', 'foreign_owned', 'local_government_owned', 'nonprofit_organization', 'organizational_type', 'recipient_city_name', 'recipient_state_code',
'recipient_country_name', 'us_federal_government', 'us_local_government', 'us_state_government', 'recipient_duns']
recipient = df[recipient_cols]
grouped = recipient.groupby(by=['recipient_name', 'city_local_government', 'county_local_government', 'emerging_small_business', 'federal_agency', 'for_profit_organization', 
'foreign_government', 'foreign_owned', 'local_government_owned', 'nonprofit_organization', 'organizational_type', 'recipient_city_name', 
'recipient_country_name', 'us_federal_government', 'us_local_government', 'us_state_government', 'recipient_duns']).max().reset_index()
grouped.to_csv('C:/Users/chris/Desktop/testrecipient1.csv', index = False)
