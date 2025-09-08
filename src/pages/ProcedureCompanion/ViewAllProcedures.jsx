import {
  EyeOutlined,
  IdcardOutlined,
  PlusOutlined,
  SettingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Card, Table, Tooltip } from "antd";
import { useState } from "react";

const ViewAllProcedures = ({ setOption }) => {
  const data = Array.from({ length: 8 }, (_, i) => {
    return {
      procedure: `Sample Procedure ${i + 1}`,
      company: `Company Name ${i + 1}`,
      number: `#${i + 1}${i + 2}${i + 3}${i + 4}`,
      companyLogo:
        "https://img.freepik.com/vector-gratis/plantilla-logotipo-colorido-mariposa_361591-1587.jpg",
      type: ["Checklist", "Non-Checklist", "Routine"],
    };
  });

  const coloumns = [
    {
      key: "companyLogo",
      title: "Company Logo",
      dataIndex: "companyLogo",
      render: (text) => (
        <img src={text} alt="profile" className="w-18 h-18 object-fill" />
      ),
    },
    {
      key: "procedure",
      title: "Procedure",
      dataIndex: "procedure",
    },
    {
      key: "company",
      title: "Company",
      dataIndex: "company",
    },
    {
      key: "number",
      title: "Number",
      dataIndex: "number",
    },
    {
      key: "type",
      title: "Type",
      dataIndex: "type",
      render: (arr) => {
        console.log(arr);

        const typeOption = Math.floor(Math.random() * 3);
        return arr[typeOption];
      },
    },
  ];

  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [showInTable, setShowInTable] = useState(false);

  const handleOptionSelection = (e) => {
    const { value } = e.target;
    setOption(value);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchKeyWord(value);
    if (value === "") {
      setFilterData(data);
      return;
    }
    const filteredData = data.filter(
      (obj) => obj.procedure.toLowerCase() === value.toLowerCase()
    );
    setFilterData(filteredData);
  };

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-50">
      <div className="md:flex w-full gap-2">
        <input
          type="text"
          className="md:w-[70%] bg-white w-full border p-2 border-black/10 focus:outline-none rounded-lg"
          value={searchKeyWord}
          onChange={handleSearch}
          placeholder="Search"
        />

        <div className="md:w-[30%] w-full flex gap-2 md:mt-0 mt-3">
          <button
            value="createProcedure"
            onClick={handleOptionSelection}
            className="btn-primary text-sm flex justify-center items-center gap-2 "
          >
            <PlusOutlined />
            Create Procedure
          </button>
          <button
            value="setupTemplate"
            onClick={handleOptionSelection}
            className="btn-primary text-sm flex justify-center items-center gap-2"
          >
            <SettingOutlined />
            Setup Template
          </button>
          <button className="btn-primary text-sm flex justify-center items-center gap-2">
            <EyeOutlined />
            View Execution
          </button>
        </div>
      </div>
      <div className="pr-1 mt-5 flex w-full justify-end items-end">
        <Tooltip title={showInTable ? "Card layout" : "Table layout"}>
          <Button
            size="large"
            icon={showInTable ? <IdcardOutlined /> : <TableOutlined />}
            onClick={() => setShowInTable(!showInTable)}
          />
        </Tooltip>
      </div>
      {showInTable ? (
        <div className="mt-3 overflow-y-scroll">
          <Table
            rowHoverable={false}
            dataSource={data}
            columns={coloumns}
            pagination={false}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "bg-orange-100" : "bg-white"
            }
            className="rounded-lg shadow-sm"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5 w-full overflow-y-auto">
          {filterData.map((value, index) => {
            {
              /* return (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-100" : "bg-white"
                } flex justify-start gap-3 items-center p-3 border border-black/10 rounded-lg transform-translate-full duration-150 ease-in hover:shadow-[0_2px_7px_rgba(0,0,0,0.2)] hover:-translate-y-0.5`}
              >
                <img
                  src={value.companyLogo}
                  className="w-[150px] border border-black/10 rounded-full"
                />
                <div className="flex flex-col leading-snug">
                  <h1 className="text-xl font-medium">{value.procedure}</h1>
                  <p className="text-base">{value.company}</p>
                  <p className="text-base">{value.number}</p>
                  <p className="text-base">
                    Type : {value.type[Math.floor(Math.random() * 2)]}
                  </p>
                </div>
              </div>
            ); */
            }
            const typeIndex = Math.floor(Math.random() * 3);
            return (
              <div
                className="flex flex-col bg-white border border-black/10 rounded-lg gap-5 p-5 w-full transform-translate-full duration-150 ease-in hover:shadow-[0_2px_7px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                key={index}
              >
                <div className="flex justify-start items-center gap-3">
                  <img
                    src={value.companyLogo}
                    alt="logo"
                    className="w-[100px] rounded-full border border-black/10"
                  />
                  <h1 className="text-lg font-semibold">{value.company}</h1>
                </div>
                <p className="text-medium text-gray-600">{value.procedure}</p>
                <div className="flex justify-between items-center">
                  <p
                    className={`${
                      value.type[typeIndex] === "Checklist" &&
                      "bg-green-100 text-green-800"
                    } ${
                      value.type[typeIndex] === "Non-Checklist" &&
                      "bg-red-100 text-red-800"
                    } ${
                      value.type[typeIndex] === "Routine" &&
                      "bg-yellow-100 text-yellow-800"
                    } py-1 px-2  font-medium rounded-lg`}
                  >
                    {value.type[typeIndex]}
                  </p>
                  <p className="text-gray-400 font-semibold">{value.number}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {}
    </div>
  );
};

export default ViewAllProcedures;
