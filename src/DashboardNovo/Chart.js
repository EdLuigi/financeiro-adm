import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import moment from "moment";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const dataFix = [
    createData("00:00", -100),
    createData("03:00", 300),
    createData("06:00", -600),
    createData("09:00", 800),
    createData("24:00", 0),
];

export default function Chart(props) {
    const theme = useTheme();
    const { data } = props;

    // let aux = data.map((i) => i);
    console.log("data: " + data);
    let dataMod = [];
    // for (let i = 5; i >= 0; i--) {
    //     dataMod.push(
    //         createData(
    //             moment(data[i].criado_em.toDate()).format("DD/MM/YYYY"),
    //             +data[i].valor
    //         )
    //     );
    // }

    return (
        <React.Fragment>
            <Title>Movimentação</Title>
            <ResponsiveContainer>
                <LineChart
                    data={null}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label angle={0} position="bottom">
                            Datas
                        </Label>
                    </XAxis>
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: "middle",
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Valores (R$)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
