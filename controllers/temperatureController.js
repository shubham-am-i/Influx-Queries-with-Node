import influx from '../schema/temperatureSchema.js'

// Insert a new temperature data point
const addTemperature = async (req, res) => {
  const { location, value } = req.body

  try {
    await influx.writePoints([
      {
        measurement: 'temperature',
        tags: { location },
        fields: { value: parseFloat(value) },
      },
    ])

    res.status(201).send('Temperature data point inserted successfully')
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal server error')
  }
}

// Retrieve temperature data points for a location
const getTemperature = async (req, res) => {
  const { location } = req.params

  try {
    const results = await influx.query(`
      SELECT * FROM temperature
      WHERE location = '${location}'
      ORDER BY time DESC
    `)
    res.json(results)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal server error')
  }
}

// Delete temperature data points for a location
const deleteTemperature = async (req, res) => {
  const { location } = req.params

  try {
    await influx.query(`DELETE FROM temperature WHERE location = '${location}'`)
    res.status(200).send('Temperature data points deleted successfully')
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal server error')
  }
}

const getAllMeasurements = async (req, res) => {
  try {
    const results = await influx.getMeasurements()

    res.status(200).json(results)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal server error')
  }
}

export { addTemperature, getTemperature, deleteTemperature, getAllMeasurements }
