import Influx from 'influx'
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'influx_query_db',
  schema: [
    {
      measurement: 'temperature',
      fields: {
        value: Influx.FieldType.FLOAT,
      },
      tags: ['location'],
    },
  ],
})

export default influx
