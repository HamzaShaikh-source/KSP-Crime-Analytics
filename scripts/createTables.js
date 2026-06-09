// Create Data Store tables via Catalyst ZCQL
// Run: node scripts/createTables.js
const catalyst = require('zcatalyst-sdk-node');
const fs = require('fs');
const path = require('path');

// Initialize with CLI credentials (auto-detected)
const app = catalyst.initialize({});

async function main() {
  const gql = app.gql();

  // Create districts table
  const queries = [
    `CREATE TABLE districts (
      ROWID BIGINT AUTO_INCREMENT,
      sl_no BIGINT,
      name VARCHAR(100),
      range_name VARCHAR(100),
      ipc_crimes BIGINT,
      sll_crimes BIGINT,
      murder BIGINT,
      attempt_murder BIGINT,
      rape BIGINT,
      dacoity BIGINT,
      robbery BIGINT,
      burglary BIGINT,
      theft BIGINT,
      riots BIGINT,
      hurt BIGINT,
      cruelty_by_husband BIGINT,
      dowry_deaths BIGINT,
      fatal_accidents BIGINT,
      molestation BIGINT,
      scst BIGINT,
      gambling BIGINT,
      cyber_crime BIGINT,
      pocso BIGINT,
      latitude DOUBLE,
      longitude DOUBLE
    )`,

    `CREATE TABLE ipc_crimes (
      ROWID BIGINT AUTO_INCREMENT,
      year BIGINT,
      crime_category VARCHAR(200),
      sub_category VARCHAR(200),
      cases BIGINT
    )`,

    `CREATE TABLE sll_crimes (
      ROWID BIGINT AUTO_INCREMENT,
      year BIGINT,
      crime_category VARCHAR(200),
      sub_category VARCHAR(200),
      cases BIGINT
    )`,

    `CREATE TABLE crime_reviews (
      ROWID BIGINT AUTO_INCREMENT,
      year BIGINT,
      month VARCHAR(20),
      crime_type VARCHAR(100),
      major_head VARCHAR(200),
      minor_head VARCHAR(200),
      current_year_cases BIGINT,
      prev_year_cases BIGINT,
      prev_month_cases BIGINT,
      current_month_cases BIGINT
    )`,

    `CREATE TABLE criminal_profiles (
      ROWID BIGINT AUTO_INCREMENT,
      name VARCHAR(100),
      age BIGINT,
      crime_types VARCHAR(500),
      repeat_offender BOOLEAN,
      risk_score BIGINT,
      total_cases BIGINT,
      district VARCHAR(100)
    )`,

    `CREATE TABLE alerts (
      ROWID BIGINT AUTO_INCREMENT,
      severity VARCHAR(20),
      alert_type VARCHAR(100),
      title VARCHAR(300),
      description VARCHAR(1000),
      district VARCHAR(100),
      timestamp DATETIME,
      resolved BOOLEAN
    )`,
  ];

  for (const query of queries) {
    try {
      console.log(`Executing: ${query.substring(0, 60)}...`);
      const result = await gql.executeGQL(query);
      console.log(`  ✅ Success:`, JSON.stringify(result).substring(0, 100));
    } catch (e) {
      if (e.message && e.message.includes('already exists')) {
        console.log(`  ⏭️  Table already exists`);
      } else {
        console.log(`  ❌ Error: ${e.message}`);
      }
    }
  }

  console.log('\n✅ Table creation complete!');
}

main().catch(console.error);
