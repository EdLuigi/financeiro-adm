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

export default function Chart(props) {
    const theme = useTheme();
    const { data } = props;
    const dataReverse = [...data].reverse();

    let dataMod = [];
    dataReverse.map((i) => {
        dataMod.push({
            time: moment(i.criado_em.toDate()).format("DD/MM/YYYY"),
            value: +i.valor,
        });
    });

    return (
        <React.Fragment>
            <Title>Movimentação</Title>
            <ResponsiveContainer>
                <LineChart
                    data={dataMod}
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
                        dataKey="value"
                        stroke={theme.palette.primary.main}
                        dot={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
