import { LineChart,Tooltip,YAxis ,XAxis,CartesianGrid,ResponsiveContainer,Legend,Line} from "recharts";



const data = [
 

  {
    "name": "Page C",
    "uv": 30,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 60,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 70,
  
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 20,
    
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 10,
    "amt": 2500
  },
  {
    "name": "Page F",
    "uv": 20,
    "amt": 2500
  }
]
const Chart = () =>{
  return(
<ResponsiveContainer width='100%' height={300}>
    <LineChart width={730} height={250} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
  )
}

export default Chart;