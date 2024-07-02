// pages/api/query.ts
import { InfluxDB, type QueryApi, type FluxTableMetaData } from '@influxdata/influxdb-client';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as process from "node:process";
const url = 'https://eu-central-1-1.aws.cloud2.influxdata.com/'; // Replace with your InfluxDB URL;
const token = process.env.INFLUXDB_TOKEN;
console.log(token)
const org = 'Dashboard'

const influxDB: InfluxDB = new InfluxDB({ url, token });
const queryApi: QueryApi = influxDB.getQueryApi(org);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const fluxQuery = `from(bucket: "Cars")
  |> range(start: -12h)
  |> filter(fn: (r) => r._field == "speed" and r.brand == "Audi")`;

    try {
        //eslint-disable-next-line
        const rows: any[] = [];
        queryApi.queryRows(fluxQuery, {
            next: (row: string[], tableMeta: FluxTableMetaData) => {
                const o = tableMeta.toObject(row);
                rows.push(o);
            },
            error: (error: Error) => {
                console.error(error);
                res.status(500).send(error.message);
            },
            complete: () => {
                res.status(200).json(rows);
            },
        });
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
}