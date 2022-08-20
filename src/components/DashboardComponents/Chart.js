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
    const [values, setValues] = React.useState([{ time: "", value: 0 }]);

    const calcVariacaoTotal = (dataReverse) => {
        let aux = 0,
            auxObj = [];
        dataReverse.map((index) => {
            if (index.tipo == 0) {
                aux += index.valor;
            } else {
                aux -= index.valor;
            }
            auxObj.push({
                time: moment(index.criado_em.toDate()).format("DD/MM/YY"),
                value: aux,
            });
        });
        return auxObj;
    };

    const limiteValores = (valores) => {
        const limite = 7;
        if (valores.length >= limite) {
            return valores.slice(valores.length - limite, valores.length);
        } else {
            return valores;
        }
    };

    const setValoresChart = () => {
        const dataReverse = [...data].reverse();
        setValues(limiteValores(calcVariacaoTotal(dataReverse)));
    };

    React.useEffect(() => {
        setValoresChart();
    }, [data]);

    return (
        <React.Fragment>
            <Title>Movimentação</Title>
            <ResponsiveContainer>
                <LineChart
                    data={values}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 20,
                        left: 20,
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
