"use client";
import React from "react";
import { Table } from "antd";
import { InfectionDataItem } from "@interfaces/infection-data.types";
import { IApiResponse } from "@interfaces/api-response.types";
import {
  getPaginatedCredentials,
  getPaginatedMainInfo,
} from "./helpers/get-paginated-data";
import {
  getComputerInfoColumns,
  getCredentialsColumns,
  getMainInfoColumns,
} from "./helpers/get-table-columns";

interface DomainResultsTableProps {
  apiResponseData: IApiResponse<InfectionDataItem[]>;
  onComputerPageChange: (page: number) => void;
  onCredentialsPageChange: (page: number) => void;
  onMainInfoPageChange: (page: number) => void;
  computerPagination: { current: number; total: number; pageSize: number };
  credentialsPagination: { current: number; total: number; pageSize: number };
  mainInfoPagination: { current: number; total: number; pageSize: number };
}

const DomainResultsTable: React.FC<DomainResultsTableProps> = ({
  apiResponseData,
  onComputerPageChange,
  onCredentialsPageChange,
  onMainInfoPageChange,
  computerPagination,
  credentialsPagination,
  mainInfoPagination,
}) => {
  const paginatedCredentials = getPaginatedCredentials(
    apiResponseData.data,
    credentialsPagination.current,
    credentialsPagination.pageSize
  );
  const paginatedMainInfo = getPaginatedMainInfo(
    apiResponseData.data,
    mainInfoPagination.current,
    mainInfoPagination.pageSize
  );

  return (
    <div className="flex flex-col">
      {apiResponseData?.data?.length ? (
        <div className="bg-red-500 text-white p-4 mb-4 rounded">
          <strong>Attention!</strong> One of your domains has an infection!
        </div>
      ) : (
        <div className="bg-green-500 text-white p-4 mb-4 rounded">
          Your domains are secure!
        </div>
      )}
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <h3 className="font-semibold mb-2">Main Information</h3>
          <div className="h-full overflow-y-auto border rounded-lg shadow bg-white">
            <Table
              dataSource={paginatedMainInfo}
              columns={getMainInfoColumns()}
              rowKey="id"
              className="w-full max-h-60"
              pagination={{
                current: mainInfoPagination.current,
                total: mainInfoPagination.total,
                pageSize: mainInfoPagination.pageSize,
                onChange: onMainInfoPageChange,
              }}
            />
          </div>
        </div>
        <div className="w-1/2 ml-5">
          <h3 className="font-semibold mb-2">Credentials</h3>
          <div className="h-full overflow-y-auto border rounded-lg shadow bg-white">
            <Table
              dataSource={paginatedCredentials}
              columns={getCredentialsColumns()}
              rowKey="id"
              pagination={{
                current: credentialsPagination.current,
                total: apiResponseData?.data?.flatMap(
                  (item) => item.credentials
                ).length,
                pageSize: credentialsPagination.pageSize,
                onChange: onCredentialsPageChange,
              }}
              className="w-full min-h-60"
            />
          </div>
        </div>
      </div>
      <h3 className="font-semibold mb-2 mt-5">Computer Information</h3>
      <div className="h-full overflow-y-auto border rounded-lg shadow bg-white">
        <Table
          dataSource={apiResponseData.data}
          columns={getComputerInfoColumns()}
          rowKey="id"
          pagination={{
            current: computerPagination.current,
            total: computerPagination.total,
            pageSize: computerPagination.pageSize,
            onChange: onComputerPageChange,
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DomainResultsTable;
