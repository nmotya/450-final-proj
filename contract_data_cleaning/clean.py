import pandas as pd
import numpy as np

#Reads given csv
df = pd.read_csv('2020_contracts_6.csv', dtype='unicode')
drop_list = ['contract_transaction_unique_key','contract_award_unique_key','award_id_piid', 'award_description', 'award_id_fain', 'award_type_code', 'business_funds_indicator_description', 
'contigency_humanitarian_or_peacekeeping_operation_code', 'contract_financing_code', 'country_of_product_or_service_origin_code', 'domestic_or_foreign_entity_code', 'inherently_governmental_functions', 'local_area_set_aside_code', 
'modification_number', 'multi_year_contract_code', 'national_interest_action_code', 'parent_award_id_piid', 'prime_award_fain', 'prime_award_unique_key', 'product_or_service_code', 'transaction_number', 'city_local_government', 
'county_local_government', 'educational_institution', 'emerging_small_business', 'federal_agency', 'for_profit_organization', 'foreign_government', 'foreign_owned', 'international_organization', 'local_government_owned', 
'nonprofit_organization', 'organizational_type', 'receives_contracts', 'recipient_country_code', 'recipient_city_name', 'recipient_country_name', 'recipient_name', 'recipient_state_code', 'us_federal_government', 
'us_government_entity', 'us_local_government', 'us_state_government', 'awarding_agency_code', 'awarding_agency_name', 'awarding_office_code', 'awarding_office_name', 'foreign_funding', 'funding_agency_code', 'funding_office_code', 
'current_total_value_of_award', 'potential_total_value_of_award', 'action_date', 'action_date_fiscal_year', 'recipient_duns']
df.drop(df.columns.difference(drop_list), 1, inplace=True)
df = df.drop(df[(df['us_state_government'] != 't') & (df['us_state_government'] != 'f')].index)
df = df.drop(df[(df['emerging_small_business'] != 't') & (df['emerging_small_business'] != 'f')].index)
df = df.drop(df[(df['us_federal_government'] != 't') & (df['us_federal_government'] != 'f')].index)
df = df.drop(df[(df['federal_agency'] != 't') & (df['federal_agency'] != 'f')].index)
df = df.drop(df[(df['us_local_government'] != 't') & (df['us_local_government'] != 'f')].index)
df = df.drop(df[(df['city_local_government'] != 't') & (df['city_local_government'] != 'f')].index)
df = df.drop(df[(df['local_government_owned'] != 't') & (df['local_government_owned'] != 'f')].index)
df = df.drop(df[(df['county_local_government'] != 't') & (df['county_local_government'] != 'f')].index)
df = df.drop(df[(df['foreign_government'] != 't') & (df['foreign_government'] != 'f')].index)
df = df.drop(df[(df['international_organization'] != 't') & (df['international_organization'] != 'f')].index)
df = df.drop(df[(df['us_government_entity'] != 't') & (df['us_government_entity'] != 'f')].index)
df = df.drop(df[(df['receives_contracts'] != 't') & (df['receives_contracts'] != 'f')].index)
df = df.drop(df[(df['foreign_owned'] != 't') & (df['foreign_owned'] != 'f')].index)
df = df.drop(df[(df['for_profit_organization'] != 't') & (df['for_profit_organization'] != 'f')].index)
df = df.drop(df[(df['nonprofit_organization'] != 't') & (df['nonprofit_organization'] != 'f')].index)
df.dropna(subset = ["awarding_agency_name", "recipient_name", "recipient_country_name", "recipient_city_name", "awarding_office_name", "potential_total_value_of_award",
"contract_award_unique_key", "contract_transaction_unique_key", "award_id_piid", "foreign_funding", "recipient_duns", "modification_number", "parent_award_id_piid",
"organizational_type", "country_of_product_or_service_origin_code", "current_total_value_of_award"], inplace=True)
df.to_csv('D:/cleaned/2020_cleaned_6.csv', index = False)
