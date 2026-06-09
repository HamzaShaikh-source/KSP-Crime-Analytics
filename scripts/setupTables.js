// Create Data Store tables using Catalyst SDK
const catalyst = require('zcatalyst-sdk-node');
const path = require('path');
const fs = require('fs');

// Read project config
const configPath = path.join(__dirname, '..', '.catalystrc');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const projectConfig = config.projects[0];

// Initialize Catalyst App
const app = catalyst.initialize({
  project_id: projectConfig.id,
  project_domain: projectConfig.domain.name,
  environment: 'Development',
});

async function main() {
  const datastore = app.datastore();

  const tables = [
    {
      table_name: 'districts',
      columns: [
        { column_name: 'sl_no', data_type: 'bigint' },
        { column_name: 'name', data_type: 'varchar', max_length: 100 },
        { column_name: 'range_name', data_type: 'varchar', max_length: 100 },
        { column_name: 'ipc_crimes', data_type: 'bigint' },
        { column_name: 'sll_crimes', data_type: 'bigint' },
        { column_name: 'murder', data_type: 'bigint' },
        { column_name: 'attempt_murder', data_type: 'bigint' },
        { column_name: 'rape', data_type: 'bigint' },
        { column_name: 'dacoity', data_type: 'bigint' },
        { column_name: 'robbery', data_type: 'bigint' },
        { column_name: 'burglary', data_type: 'bigint' },
        { column_name: 'theft', data_type: 'bigint' },
        { column_name: 'riots', data_type: 'bigint' },
        { column_name: 'hurt', data_type: 'bigint' },
        { column_name: 'cruelty_by_husband', data_type: 'bigint' },
        { column_name: 'dowry_deaths', data_type: 'bigint' },
        { column_name: 'fatal_accidents', data_type: 'bigint' },
        { column_name: 'molestation', data_type: 'bigint' },
        { column_name: 'scst', data_type: 'bigint' },
        { column_name: 'gambling', data_type: 'bigint' },
        { column_name: 'cyber_crime', data_type: 'bigint' },
        { column_name: 'pocso', data_type: 'bigint' },
        { column_name: 'latitude', data_type: 'double' },
        { column_name: 'longitude', data_type: 'double' },
      ]
    },
    {
      table_name: 'ipc_crimes',
      columns: [
        { column_name: 'year', data_type: 'bigint' },
        { column_name: 'crime_category', data_type: 'varchar', max_length: 200 },
        { column_name: 'sub_category', data_type: 'varchar', max_length: 200 },
        { column_name: 'cases', data_type: 'bigint' },
      ]
    },
    {
      table_name: 'sll_crimes',
      columns: [
        { column_name: 'year', data_type: 'bigint' },
        { column_name: 'crime_category', data_type: 'varchar', max_length: 200 },
        { column_name: 'sub_category', data_type: 'varchar', max_length: 200 },
        { column_name: 'cases', data_type: 'bigint' },
      ]
    },
    {
      table_name: 'crime_reviews',
      columns: [
        { column_name: 'year', data_type: 'bigint' },
        { column_name: 'month', data_type: 'varchar', max_length: 20 },
        { column_name: 'crime_type', data_type: 'varchar', max_length: 100 },
        { column_name: 'major_head', data_type: 'varchar', max_length: 200 },
        { column_name: 'minor_head', data_type: 'varchar', max_length: 200 },
        { column_name: 'current_year_cases', data_type: 'bigint' },
        { column_name: 'prev_year_cases', data_type: 'bigint' },
        { column_name: 'prev_month_cases', data_type: 'bigint' },
        { column_name: 'current_month_cases', data_type: 'bigint' },
      ]
    },
  ];

  // Try creating each table
  for (const tableDef of tables) {
    try {
      console.log(`Creating table: ${tableDef.table_name}...`);
      // Since SDK may not expose createTable directly, try the raw API
      const result = await datastore.getTableDetails(tableDef.table_name).catch(() => null);
      if (result) {
        console.log(`  Table ${tableDef.table_name} already exists`);
      } else {
        console.log(`  Table ${tableDef.table_name} does not exist yet - needs to be created via console`);
      }
    } catch (e) {
      console.log(`  Error checking ${tableDef.table_name}: ${e.message}`);
    }
  }

  console.log('\nDone checking tables.');
  console.log('\nTo create tables, use the Catalyst console browser at:');
  console.log('https://console.catalyst.zoho.in/baas/60073657069/project/49839000000017001/Development#/cloudscale/datastore/tables');
}

main().catch(console.error);
