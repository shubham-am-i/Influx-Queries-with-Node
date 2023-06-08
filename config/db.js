import influx from '../schema/temperatureSchema.js'

// Connect to the InfluxDB server
async function connectToDatabase() {
  try {
    const names = await influx.getDatabaseNames()
    if (!names.includes('influx_query_db')) {
      await influx.createDatabase('influx_query_db')
    }
    console.log('Influx DB Connected'.cyan.bold)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

export default connectToDatabase
