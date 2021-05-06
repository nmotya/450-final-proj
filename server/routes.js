const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
//Use connectionContract when querying contracts, assistance when querying assistance. See test examples below.
const connectionContract = mysql.createPool(config.Contracts);
const connectionAssistance = mysql.createPool(config.Assistance);

const test = (req, res) => {
    const query = `
      SELECT *
      FROM state
    `;
  
    connectionAssistance.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

  const test1 = (req, res) => {
    const query = `
      SELECT *
      FROM Source
      `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const contractSpendingAcrossYears = (req, res) => {
    const year1 = req.params.year1;
    const year2 = req.params.year2;
    const query = `
      SELECT potential_total_value_of_award
      FROM Awards
      WHERE action_date_fiscal_year >= ${year1} AND action_date_fiscal_year <= ${year2}
      LIMIT 100000
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const contractSpendingAcrossYearsSum = (req, res) => {
    const year1 = req.params.year1;
    const year2 = req.params.year2;
    const query = `
      SELECT sum(potential_total_value_of_award)
      FROM Awards
      WHERE action_date_fiscal_year >= ${year1} AND action_date_fiscal_year <= ${year2}
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const contractAgencySpending = (req, res) => {
    const agency = req.params.agency;
    const query = `
      SELECT sum(potential_total_value_of_award), s.awarding_agency_name
      FROM Awards a JOIN Source s ON a.awarding_agency_code_award = s.awarding_agency_code
      WHERE s.awarding_agency_name LIKE '${agency}%' 
      GROUP BY s.awarding_agency_name
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const contractAgencySpendingYear = (req, res) => {
    const agency = req.params.agency;
    const year1 = req.params.year1;
    const year2 = req.params.year2;
    const query = `
      SELECT sum(potential_total_value_of_award), s.awarding_agency_name
      FROM Awards a JOIN Source s ON a.awarding_agency_code_award = s.awarding_agency_code
      WHERE s.awarding_agency_name LIKE '${agency}%' AND a.action_date_fiscal_year >= ${year1} 
      AND a.action_date_fiscal_year <= ${year2}
      GROUP BY s.awarding_agency_name
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const contractForeignSpending = (req, res) => {
    const query = `
      SELECT r.recipient_country_name,  SUM(a.potential_total_value_of_award) as total
      FROM Awards a JOIN Recipient r ON a.recipient_duns_award = r.recipient_duns
      WHERE r.recipient_country_name <> 'UNITED STATES'
      GROUP BY r.recipient_country_name
      ORDER BY total DESC
      `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };


const contractStateSpending = (req, res) => {
    const query = `
      SELECT sum(a.potential_total_value_of_award) as sum, r.recipient_state_code
      FROM Awards a JOIN Recipient r ON a.recipient_duns_award = r.recipient_duns
      WHERE r.recipient_country_name= 'UNITED STATES'
      GROUP BY r.recipient_state_code
      ORDER by sum desc
      `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  }; 

const contractLargestStateAward = (req, res) => {
    const agency = req.params.agency;
    const query = `
      WITH epaAwards AS (
      SELECT max(a.potential_total_value_of_award) as max, a.recipient_duns_award
      FROM Awards a JOIN Source s ON a.awarding_agency_code_award = s.awarding_agency_code
      WHERE s.awarding_agency_name like '${agency}%'
      )
      SELECT distinct r.recipient_state_code
      FROM epaAwards e JOIN Recipient r ON e.recipient_duns_award = r.recipient_duns
      `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  }; 

const contractCovidAward = (req, res) => {
    const query = `
      WITH covidAwards AS(
      SELECT *
      FROM Awards a JOIN Recipient r ON a.recipient_duns_award = r.recipient_duns
      WHERE r.organizational_type = 'CORPORATE NOT TAX EXEMPT' AND  a.action_date LIKE '3%' AND  a.action_date_fiscal_year = 2020
      )
      SELECT DISTINCT recipient_name
      FROM covidAwards
      WHERE potential_total_value_of_award >= 100000 AND recipient_country_name = 'United States'
      `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  }; 
  
module.exports = {
    test: test,
    test1: test1,
    contractSpendingAcrossYears: contractSpendingAcrossYears,
    contractAgencySpending: contractAgencySpending,
    contractSpendingAcrossYearsSum: contractSpendingAcrossYearsSum, 
    contractAgencySpendingYear: contractAgencySpendingYear,
    contractForeignSpending: contractForeignSpending,
    contractStateSpending: contractStateSpending,
    contractLargestStateAward: contractLargestStateAward,
    contractCovidAward: contractCovidAward,
    contractSpendingAcrossYears: contractSpendingAcrossYears,
    contractSpendingAcrossYearsSumGroupBy: contractSpendingAcrossYearsSumGroupBy,
    assistanceSpendingAcrossYearsSumGroupBy: assistanceSpendingAcrossYearsSumGroupBy,
    contractPaSpendingByYear: contractPaSpendingByYear

    
};