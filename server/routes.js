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
    SELECT potential_total_value_of_award, action_date_
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

const contractSpendingAcrossYearsSumGroupBy = (req, res) => {
  const query = `
    SELECT sum(potential_total_value_of_award), action_date_fiscal_year
    FROM Awards
    GROUP BY action_date_fiscal_year
  `;

  connectionContract.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const assistanceSpendingAcrossYearsSumGroupBy = (req, res) => {
  const query = `
    SELECT sum(total_obligated_amount), action_date_fiscal_year
    from transaction
    GROUP BY action_date_fiscal_year
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
    SELECT sum(t.total_obligated_amount), a.agency_name
    FROM agency a join transaction t on a.agency_code = t.awarding_agency_code
    GROUP BY a.agency_name
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
//No Non USA country code exists in Assistance database

const contractStateSpending = (req, res) => {
  const query = `
    SELECT sum(a.potential_total_value_of_award) as sum, r.recipient_state_code
    FROM Awards a JOIN Recipient r ON a.recipient_duns_award = r.recipient_duns
    WHERE r.recipient_country_name= 'UNITED STATES'
    GROUP BY r.recipient_state_code
    `;

  connectionContract.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
}; 

const assistanceStateSpending = (req, res) => {
  const query = `
    WITH spendingState AS (SELECT sum(t.total_obligated_amount) as sum, r.recipient_state_code as code
    from transaction t JOIN award a on t.award_id_fain = a.award_id_fain JOIN recipient r on a.recipient_duns = r.recipient_duns
    WHERE recipient_country_code = 'USA'
    group by r.recipient_state_code)
    SELECT s.sum, s.code, st.recipient_state_name
    FROM spendingState s JOIN state st ON s.code = st.recipient_state_code
    `;

  connectionAssistance.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
}; 

//Finds largest award from given agency, matches it to state
const contractLargestStateAward = (req, res) => {
  const agency = req.params.agency;
  const query = `
    WITH agencyAwards AS (
    SELECT max(a.potential_total_value_of_award) as max, a.recipient_duns_award
    FROM Awards a JOIN Source s ON a.awarding_agency_code_award = s.awarding_agency_code
    WHERE s.awarding_agency_name like '${agency}%'
    )
    SELECT distinct r.recipient_state_code
    FROM agencyAwards e JOIN Recipient r ON e.recipient_duns_award = r.recipient_duns
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

const assistanceSpendingByYear = (req, res) => {
  const year1 = req.params.year1;
  const query = `
    SELECT sum(total_obligated_amount)
    FROM transaction
    WHERE action_date_fiscal_year = ${year1} 
  `;

  connectionAssistance.query(query, (err, rows, fields) => {
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

const assistanceSourceToRecipient = (req, res) => {
  const source = req.params.source;
  const recipient = req.params.recipient;
  const query = `
    WITH sourceAwards as (SELECT t.total_obligated_amount as amount, a.recipient_duns
    FROM transaction t JOIN agency ag ON t.awarding_agency_code = ag.agency_code JOIN award a ON t.award_id_fain = a.award_id_fain
    WHERE ag.agency_name LIKE '${source}%')
    
    Select sa.amount, sa.recipient_duns
    FROM sourceAwards sa JOIN recipient r ON sa.recipient_duns = r.recipient_duns
    WHERE r.recipient_name LIKE '${recipient}%'
    GROUP BY sa.recipient_duns
  `;

  connectionAssistance.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const contractRecipientType = (req, res) => {
  const query = `
    SELECT sum(a.potential_total_value_of_award), r.organizational_type
    FROM Awards a JOIN Recipient r ON a.recipient_duns_award = r.recipient_duns
    GROUP BY r.organizational_type
  `;

  connectionContract.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const contractPaSpendingByYear = (req, res) => {
  const query = `
    SELECT sum(a.potential_total_value_of_award), a.action_date_fiscal_year, r.recipient_state_code
    FROM Awards a JOIN Recipient r on a.recipient_duns_award = r.recipient_duns
    WHERE r.recipient_state_code LIKE 'PA%' 
    GROUP BY a.action_date_fiscal_year
  `;

  connectionContract.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const assistanceAreaofworkStateHighest = (req, res) => {
  const year = req.params.year;
  const query = `
  WITH SumQuery as (
    SELECT sum(t.total_obligated_amount) as sum, aow.cfda_number, aow.cfda_title, s.recipient_state_name
    FROM area_of_work aow
    JOIN transaction t ON aow.cfda_number = t.cfda_number
    JOIN award a on a.award_id_fain = t.award_id_fain
    JOIN recipient r on r.recipient_duns = a.recipient_duns
    JOIN state s ON r.recipient_state_code = s.recipient_state_code
    WHERE t.action_date_fiscal_year = ${year}
    GROUP BY aow.cfda_number, aow.cfda_title, s.recipient_state_name
    ORDER BY sum(t.total_obligated_amount) DESC
    )
    SELECT MAX(sum) as sum, recipient_state_name as state, cfda_title 
    FROM SumQuery
    GROUP BY recipient_state_name;
  `;

  connectionAssistance.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const contractOrganizationStateHighest = (req, res) => {
  const year = req.params.year;
  const query = `
  WITH SumQuery as (
    SELECT sum(a.potential_total_value_of_award) as sum, r.recipient_state_code, r.recipient_name
    FROM Recipient r
    JOIN Awards a ON a.recipient_duns_award = r.recipient_duns
    WHERE a.action_date_fiscal_year = ${year}
    GROUP BY r.recipient_name, r.recipient_state_code
    )
    SELECT MAX(sum) as sum, recipient_state_code as state, recipient_name as recipient
    FROM SumQuery
    GROUP BY recipient_state_code;
  `;

  connectionContract.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const assistanceAreaofworkStateExists = (req, res) => {
  const year = req.params.year;
  const aow = req.params.aow;
  const query = `
    SELECT DISTINCT s.recipient_state_name as state
    FROM state s
    WHERE
    EXISTS (
    SELECT *
    FROM area_of_work aow1
    JOIN transaction t1 ON aow1.cfda_number = t1.cfda_number
    JOIN award a1 on a1.award_id_fain = t1.award_id_fain
    JOIN recipient r1 on r1.recipient_duns = a1.recipient_duns
    WHERE r1.recipient_state_code = s.recipient_state_code AND aow1.cfda_title = '${aow}'
    AND t1.action_date_fiscal_year = ${year}
    )
  `;

  connectionAssistance.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


const assistanceTotalAmountSpentState = (req, res) => {
  const year1 = req.params.year1;
  const year2 = req.params.year2;
  const query = `
    SELECT sum(t.total_obligated_amount) as sum, s.recipient_state_name as state
    FROM area_of_work aow
    JOIN transaction t ON aow.cfda_number = t.cfda_number
    JOIN award a on a.award_id_fain = t.award_id_fain
    JOIN recipient r on r.recipient_duns = a.recipient_duns
    JOIN state s ON r.recipient_state_code = s.recipient_state_code
    WHERE t.action_date_fiscal_year >= ${year1} AND  t.action_date_fiscal_year <= ${year2}
    GROUP BY s.recipient_state_name
  `;

  connectionAssistance.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const contractsTotalAmountSpentState = (req, res) => {
  const year1 = req.params.year1;
  const year2 = req.params.year2;
  const query = `
    SELECT sum(a.potential_total_value_of_award) as sum, r.recipient_state_code as state
    FROM Recipient r
    JOIN Awards a ON a.recipient_duns_award = r.recipient_duns
    WHERE a.action_date_fiscal_year >= ${year1} AND a.action_date_fiscal_year <= ${year2}
    GROUP BY recipient_state_code
  `;

  connectionContract.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


module.exports = {
    contractSpendingAcrossYears: contractSpendingAcrossYears,
    assistanceSpendingAcrossYears: assistanceSpendingAcrossYears,
    contractAgencySpending: contractAgencySpending,
    assistanceAgencySpending: assistanceAgencySpending,
    contractSpendingAcrossYearsSum: contractSpendingAcrossYearsSum, 
    assistanceSpendingAcrossYearsSum: assistanceSpendingAcrossYearsSum,
    contractAgencySpendingYear: contractAgencySpendingYear,
    assistanceAgencySpendingYear: assistanceAgencySpendingYear,
    contractForeignSpending: contractForeignSpending,
    contractStateSpending: contractStateSpending,
    contractLargestStateAward: contractLargestStateAward,
    contractCovidAward: contractCovidAward,
    contractSpendingByYear: contractSpendingByYear,
    contractSourceToRecipient: contractSourceToRecipient,
    contractRecipientType: contractRecipientType,
    assistanceAreaofworkStateExists,
    contractOrganizationStateHighest,
    assistanceAreaofworkStateHighest,
    assistanceStateSpending: assistanceStateSpending,
    assistanceSpendingByYear: assistanceSpendingByYear,
    assistanceSourceToRecipient: assistanceSourceToRecipient,
    assistanceTotalAmountSpentState,
    contractsTotalAmountSpentState,
    contractPaSpendingByYear: contractPaSpendingByYear,
    //add routes for Graph
    assistanceSpendingAcrossYearsSumGroupBy: assistanceSpendingAcrossYearsSumGroupBy,
    contractSpendingAcrossYearsSumGroupBy, contractSpendingAcrossYearsSumGroupBy
};