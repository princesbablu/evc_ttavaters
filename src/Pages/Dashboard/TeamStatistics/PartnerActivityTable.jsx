import React, { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "@mui/material";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { getNetworkExplorerUrl } from "../../../ContractAction/BUSDContractAction";
import { useTranslation } from "react-i18next";
import TablePagination from "@mui/material/TablePagination";
const columnHelper = createColumnHelper();
const defaultColumns = [
  columnHelper.accessor("address", {
    id: "Wallet address",
    header: (props) => (
      <>
        <button onClick={props.table.getToggleAllRowsExpandedHandler()}>
 
        </button>
        Wallet address
      </>
    ),
    cell: ({ row, getValue }) => (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`,
          display: "flex",
          alignItems: "center",
        }}
      >
        {row.getCanExpand() ? (
          <button
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: "pointer", marginRight: "0.5rem" }}
          >
     
          </button>
        ) : (
          <span style={{ marginRight: "0.5rem" }}>🔵</span>
        )}

        <OverlayTrigger
          className="d-flex"
          placement={`top`}
          overlay={
            <Tooltip id={`tooltip-top`}>
              {getValue()}
            </Tooltip>
          }
        >
          <div style={{ cursor: "pointer" }} onClick={() => getNetworkExplorerUrl(getValue())}>
            {getValue().substring(0, 4)}...{getValue().substring(getValue().length - 4)}
          </div>
        </OverlayTrigger>

      </div>
    ),
  }),

  columnHelper.accessor("_rank", {
    id: "Rank",
    header: "Rank",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("nftLevel", {
    id: "Avatar Owned",
    header: "Avatar Owned",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("_totalPartners", {
    id: "Total Partners",
    header: "Total Partners",
    cell: (info) => info.getValue(),
  }),

  // columnHelper.group({
  //   id: "totalWeeklyTurnoverGroup",
  //   header: "Total Weekly Turnover",
  //   columns: [
  //     columnHelper.accessor("totalTeamSalesPreviousWeekNumber", {
  //       id: "Last",
  //       header: "Last",
  //       cell: (info) => Number(info.getValue()).toFixed(2),
  //     }),
  //     columnHelper.accessor("totalTeamSalesLastWeekNumber", {
  //       id: "Current",
  //       header: "Current",
  //       cell: (info) => Number(info.getValue()).toFixed(2),
  //     }),
  //   ],
  // }),

  columnHelper.accessor("totalTeamSales", {
    id: "Total Avatar Team turnover",
    header: "Total Team turnover",
    cell: (info) => Number(info.getValue()).toFixed(2),
  }),
];

// const filterData = (data, query) => {
//   return data
//     .filter((item) => item.address.toLowerCase().includes(query.toLowerCase()) ||
//       (item.nestedData && filterData(item.nestedData, query).length > 0))
//     .map((item) => ({
//       ...item,
//       nestedData: item.nestedData ? filterData(item.nestedData, query) : [],
//     }));
// };

const filterData = (data, query) => {
  const lowerCaseQuery = query.toLowerCase();
  const result = data.reduce((acc, item) => {
    const isMatch = item.address.toLowerCase().includes(lowerCaseQuery);
    const filteredNestedData = item.nestedData
      ? filterData(item.nestedData, query)
      : [];

    if (isMatch) {
      acc.push({
        ...item,
        nestedData: item.nestedData || [],
      });
    } else if (filteredNestedData.length > 0) {
      acc.push(...filteredNestedData);
    }

    return acc;
  }, []);

  console.log("Filter result:", result);
  return result;
};

const BasicTable = ({ userAddress, data, setData }) => {
  const [expanded, setExpanded] = useState({});
  const [columns, setColumns] = useState([...defaultColumns]);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const filteredData = useMemo(() => filterData(data, searchQuery), [data, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const updateExpanded = (data, query) => {
        const expandedState = {};
        const recursiveExpand = (rows, parentKey = "") => {
          rows.forEach((row, index) => {
            const key = parentKey ? `${parentKey}.${index}` : `${index}`;
            if (row.nestedData && row.nestedData.length > 0) {
              if (row.address.toLowerCase().includes(query.toLowerCase())) {
                expandedState[key] = true;
              }
              recursiveExpand(row.nestedData, key);
            }
          });
        };
        recursiveExpand(data);
        return expandedState;
      };
      setExpanded(updateExpanded(filteredData, searchQuery));
    } else {
      setExpanded({});
    }
  }, [filteredData, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.nestedData,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="table-responsive mt-4">
      <div className="search-area d-flex justify-content-between align-items-between align-content-center mb-3 mb-md-4">
        <div className="search-title" >{t("Partner Activity")}</div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control  w-25 "
          type="search"
          placeholder="Search by address"
        />
      </div>
      <div className="table-area">
        <p className="table-data-title mb-2">Total Weekly Turnover</p>
        <table className="table">
          <thead className="table-h">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className={`depth-${row.depth}`}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} data-label={cell.column.columnDef.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
        <div className="parpage mt-3">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
