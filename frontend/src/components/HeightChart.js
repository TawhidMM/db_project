// HeightChart.js

import React from "react"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-moment"
import {
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Chart,
    TimeScale,
    Tooltip,
    plugins,
} from "chart.js"

Chart.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    TimeScale,
    plugins,
    Tooltip
)

const HeightChart = ({ data }) => {
    const chartData = {
        labels: data.map((entry) => entry.DATEON),
        datasets: [
            {
                label: "Height (cm)",
                data: data.map((entry) => entry.HEIGHT),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    }

    const options = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "DD MMM YY",
                    },
                },
                display: false,
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                beginAtZero: false,
                min: 70,
                title: {
                    display: true,
                    text: "Height (cm)",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Height Chart",
            },
            tooltip: {
                enabled: true,
                mode: "index",
            },
        },
    }

    return (
        <div>
            <h2>Height Chart</h2>
            <Line data={chartData} options={options} />
        </div>
    )
}

export default HeightChart
