const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
//Use connectionContract when querying contracts, assistance when querying assistance. See test examples below.
const connectionContract = mysql.createPool(config.Contracts);
const connectionAssistance = mysql.createPool(config.Assistance);



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

const assistanceSpendingAcrossYears = (req, res) => {
    const year1 = req.params.year1;
    const year2 = req.params.year2;
    const query = `
      SELECT total_obligated_amount
      FROM transaction
      WHERE action_date_fiscal_year >= ${year1} AND action_date_fiscal_year <= ${year2}
    `;
  
    connectionAssistance.query(query, (err, rows, fields) => {
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

const assistanceSpendingAcrossYearsSum = (req, res) => {
    const year1 = req.params.year1;
    const year2 = req.params.year2;
    const query = `
      SELECT sum(total_obligated_amount)
      FROM transaction
      WHERE action_date_fiscal_year >= ${year1} AND action_date_fiscal_year <= ${year2}
    `;
  
    connectionAssistance.query(query, (err, rows, fields) => {
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

const assistanceAgencySpending = (req, res) => {
    const agency = req.params.agency;
    const query = `
      SELECT sum(t.total_obligated_amount)
      FROM agency a join transaction t on a.agency_code = t.awarding_agency_code
      WHERE a.agency_name LIKE '${agency}%'
    `;
  
    connectionAssistance.query(query, (err, rows, fields) => {
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

const assistanceAgencySpendingYear = (req, res) => {
    const agency = req.params.agency;
    const year1 = req.params.year1;
    const year2 = req.params.year2;
    const query = `
      SELECT sum(t.total_obligated_amount)
      FROM agency a join transaction t on a.agency_code = t.awarding_agency_code
      WHERE a.agency_name LIKE '${agency}%' AND t.action_date_fiscal_year >= ${year1} 
      AND t.action_date_fiscal_year <= ${year2}
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

const contractSpendingByYear = (req, res) => {
    const year1 = req.params.year1;
    const query = `
      SELECT sum(potential_total_value_of_award)
      FROM Awards
      WHERE action_date_fiscal_year = ${year1} 
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const contractSourceToRecipient = (req, res) => {
    const source = req.params.source;
    const recipient = req.params.recipient;
    const query = `
      WITH sourceAwards AS (SELECT a.potential_total_value_of_award, recipient_duns_award
      FROM Awards a JOIN Source s on a.awarding_agency_code_award = s.awarding_agency_code
      WHERE s.awarding_agency_name LIKE '${source}%')
      
      SELECT sa.potential_total_value_of_award, sa.recipient_duns_award
      FROM sourceAwards sa JOIN Recipient r on sa.recipient_duns_award = r.recipient_duns
      WHERE r.recipient_name LIKE '${recipient}%'
      GROUP BY sa.recipient_duns_award
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const contractRecipientType = (req, res) => {
    const recipientType = req.params.recipientType;
    const query = `
      SELECT sum(a.potential_total_value_of_award)
      FROM Awards a JOIN Recipient r ON a.recipient_duns_award = r.recipient_duns
      WHERE organizational_type LIKE '${recipientType}%'
    `;
  
    connectionContract.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };


module.exports = {
    contractSpendingAcrossYears: contractSpendingAcrossYears,
    contractAgencySpending: contractAgencySpending,
    contractSpendingAcrossYearsSum: contractSpendingAcrossYearsSum, 
    contractAgencySpendingYear: contractAgencySpendingYear,
    contractForeignSpending: contractForeignSpending,
    contractStateSpending: contractStateSpending,
    contractLargestStateAward: contractLargestStateAward,
    contractCovidAward: contractCovidAward,
    assistanceSpendingAcrossYears: assistanceSpendingAcrossYears,
    assistanceSpendingAcrossYearsSum: assistanceSpendingAcrossYearsSum,
    assistanceAgencySpending: assistanceAgencySpending,
    assistanceAgencySpendingYear: assistanceAgencySpendingYear,
    contractSpendingByYear: contractSpendingByYear,
    contractSourceToRecipient: contractSourceToRecipient,
    contractRecipientType: contractRecipientType,
    
};