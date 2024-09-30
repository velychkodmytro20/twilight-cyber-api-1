import { ColumnType } from "antd/es/table";

export const getMainInfoColumns = () => [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Log Checksum", dataIndex: "log_checksum", key: "log_checksum" },
  { title: "Log File Name", dataIndex: "log_file_name", key: "log_file_name" },
  { title: "Stealer Type", dataIndex: "stealer_type", key: "stealer_type" },
];

export const getComputerInfoColumns = () => [
  {
    title: "Build ID",
    dataIndex: ["computer_information", "build_id"],
    key: "build_id",
  },
  {
    title: "Infection Date",
    dataIndex: ["computer_information", "infection_date"],
    key: "infection_date",
  },
  { title: "IP Address", dataIndex: ["computer_information", "ip"], key: "ip" },
  {
    title: "Malware Path",
    dataIndex: ["computer_information", "malware_path"],
    key: "malware_path",
  },
  {
    title: "Username",
    dataIndex: ["computer_information", "username"],
    key: "username",
  },
  {
    title: "Country",
    dataIndex: ["computer_information", "country"],
    key: "country",
  },
  { title: "OS", dataIndex: ["computer_information", "os"], key: "os" },
  { title: "HWID", dataIndex: ["computer_information", "hwid"], key: "hwid" },
];

export const getCredentialsColumns = (): ColumnType<any>[] => [
  {
    title: "URL",
    key: "credentials",
    render: (record: any) => (
      <div>
        <strong>URL:</strong> {record.url}
        <br />
        {record.creds && record.creds.length > 0 ? (
          record.creds.map(
            (cred: { username: string; password: string }, index: number) => (
              <div key={index}>
                <strong>Username:</strong> {cred.username},{" "}
                <strong>Password:</strong> {cred.password}
              </div>
            )
          )
        ) : (
          <div>No credentials available</div>
        )}
      </div>
    ),
  },
];
