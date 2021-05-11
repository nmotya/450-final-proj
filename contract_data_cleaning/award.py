import pandas as pd
import numpy as np

#Reads given csv
df = pd.read_csv('C:/Users/chris/Desktop/test7.csv', dtype='unicode')
award_type_cols = ['award_id_piid',  'contract_transaction_unique_key','contract_award_unique_key', 'current_total_value_of_award', 'potential_total_value_of_award',
'action_date', 'action_date_fiscal_year', 'award_description', 
'contract_financing_code', 'country_of_product_or_service_origin_code', 'domestic_or_foreign_entity_code', 
'inherently_governmental_functions', 'local_area_set_aside_code', 'parent_award_id_piid',
'recipient_name', 'awarding_agency_code', 'awarding_office_code', 'recipient_duns']
awards = df[award_type_cols]
awards.to_csv('C:/Users/chris/Desktop/testaward1.csv', index = False)

