import React, { useState } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import {
  CaretDownFilled,
  CaretUpFilled,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Sites = () => {
  const [sites, setSites] = useState([
    {
      id: crypto.randomUUID(),
      site: "",
      isHidden: false,
      controlCenters: [
        {
          id: crypto.randomUUID(),
          controlCenter: "",
          unitNames: [
            {
              id: crypto.randomUUID(),
              unitName: "",
            },
          ],
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      site: "",
      isHidden: false,
      controlCenters: [
        {
          id: crypto.randomUUID(),
          controlCenter: "",
          unitNames: [
            {
              id: crypto.randomUUID(),
              unitName: "",
            },
          ],
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      site: "",
      isHidden: false,
      controlCenters: [
        {
          id: crypto.randomUUID(),
          controlCenter: "",
          unitNames: [
            {
              id: crypto.randomUUID(),
              unitName: "",
            },
          ],
        },
      ],
    },
  ]);

  // Site operations
  const handleAddSite = () => {
    setSites([
      ...sites,
      {
        id: crypto.randomUUID(),
        site: "",
        isHidden: false,
        controlCenters: [
          {
            id: crypto.randomUUID(),
            controlCenter: "",
            unitNames: [
              {
                id: crypto.randomUUID(),
                unitName: "",
              },
            ],
          },
        ],
      },
    ]);
  };

  const handleDeleteSite = (siteId) => {
    const filteredSites = sites.filter((site) => site.id !== siteId);
    setSites(filteredSites);
  };

  const handleSiteChange = (siteId, value) => {
    setSites(
      sites.map((site) =>
        site.id === siteId ? { ...site, site: value } : site
      )
    );
  };

  // Toggle hide/show site
  const handleToggleSite = (siteId) => {
    setSites(
      sites.map((site) =>
        site.id === siteId ? { ...site, isHidden: !site.isHidden } : site
      )
    );
  };

  // Control Center operations
  const handleAddControlCenter = (siteId) => {
    setSites(
      sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              controlCenters: [
                ...site.controlCenters,
                {
                  id: crypto.randomUUID(),
                  controlCenter: "",
                  unitNames: [
                    {
                      id: crypto.randomUUID(),
                      unitName: "",
                    },
                  ],
                },
              ],
            }
          : site
      )
    );
  };

  const handleDeleteControlCenter = (siteId, controlCenterId) => {
    setSites(
      sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              controlCenters: site.controlCenters.filter(
                (cc) => cc.id !== controlCenterId
              ),
            }
          : site
      )
    );
  };

  const handleControlCenterChange = (siteId, controlCenterId, value) => {
    setSites(
      sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              controlCenters: site.controlCenters.map((cc) =>
                cc.id === controlCenterId ? { ...cc, controlCenter: value } : cc
              ),
            }
          : site
      )
    );
  };

  // Unit Name operations
  const handleAddUnitName = (siteId, controlCenterId) => {
    setSites(
      sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              controlCenters: site.controlCenters.map((cc) =>
                cc.id === controlCenterId
                  ? {
                      ...cc,
                      unitNames: [
                        ...cc.unitNames,
                        {
                          id: crypto.randomUUID(),
                          unitName: "",
                        },
                      ],
                    }
                  : cc
              ),
            }
          : site
      )
    );
  };

  const handleDeleteUnitName = (siteId, controlCenterId, unitNameId) => {
    setSites(
      sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              controlCenters: site.controlCenters.map((cc) =>
                cc.id === controlCenterId
                  ? {
                      ...cc,
                      unitNames: cc.unitNames.filter(
                        (unit) => unit.id !== unitNameId
                      ),
                    }
                  : cc
              ),
            }
          : site
      )
    );
  };

  const handleUnitNameChange = (siteId, controlCenterId, unitNameId, value) => {
    setSites(
      sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              controlCenters: site.controlCenters.map((cc) =>
                cc.id === controlCenterId
                  ? {
                      ...cc,
                      unitNames: cc.unitNames.map((unit) =>
                        unit.id === unitNameId
                          ? { ...unit, unitName: value }
                          : unit
                      ),
                    }
                  : cc
              ),
            }
          : site
      )
    );
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-5 h-fit">
        {sites.map((site, siteIndex) => (
          <div
            key={site.id}
            className="w-full flex-col border border-black/10 p-3 rounded-lg h-fit"
          >
            <div className="my-3">
              <div className="flex w-full justify-between items-center mb-2 px-1">
                <span className="text-xl font-bold">Site {siteIndex + 1}</span>
                <Tooltip title={site.isHidden ? "Show" : "Hide"}>
                  <Button
                    icon={
                      site.isHidden ? <CaretDownFilled /> : <CaretUpFilled />
                    }
                    type="default"
                    onClick={() => handleToggleSite(site.id)}
                  />
                </Tooltip>
              </div>
              <div className="flex gap-5 justify-between items-center">
                <Input
                  type="text"
                  placeholder="Enter site name"
                  value={site.site}
                  onChange={(e) => handleSiteChange(site.id, e.target.value)}
                />
                {/* Delete site btn */}
                <div
                  className={`${
                    sites.length !== 1
                      ? "flex justify-end items-center"
                      : "hidden"
                  }`}
                >
                  <Button
                    icon={<DeleteOutlined />}
                    type="primary"
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDeleteSite(site.id)}
                  />
                </div>
              </div>
            </div>
            {/* Collapsible content - only show when not hidden */}
            {!site.isHidden && (
              <>
                <div className="w-full flex flex-col gap-4">
                  {site.controlCenters.map((controlCenter, ccIndex) => (
                    <div key={controlCenter.id} className="ml-2">
                      <div className="border border-black/20 p-3 rounded-lg mb-2 bg-gray-50">
                        <Form.Item
                          label={
                            <span className="text-md font-medium text-gray-800">
                              Control Center {ccIndex + 1}
                            </span>
                          }
                        >
                          <div className="flex gap-5 justify-between items-center">
                            <Input
                              type="text"
                              placeholder="Enter control center name"
                              value={controlCenter.controlCenter}
                              onChange={(e) =>
                                handleControlCenterChange(
                                  site.id,
                                  controlCenter.id,
                                  e.target.value
                                )
                              }
                            />
                            {/* Delete control-center-btn */}
                            <div
                              className={`${
                                site.controlCenters.length !== 1
                                  ? "flex justify-end items-center"
                                  : "hidden"
                              }`}
                            >
                              <Button
                                icon={<DeleteOutlined />}
                                type="primary"
                                style={{ backgroundColor: "red" }}
                                onClick={() =>
                                  handleDeleteControlCenter(
                                    site.id,
                                    controlCenter.id
                                  )
                                }
                              />
                            </div>
                          </div>
                        </Form.Item>
                        {controlCenter.unitNames.map((unitName, unitIndex) => (
                          <div
                            key={unitName.id}
                            className="ml-2 border-l-2 border-gray-300 pl-3 py-1"
                          >
                            <Form.Item
                              label={
                                <span className="text-md font-medium text-gray-800">
                                  Unit Name {unitIndex + 1}
                                </span>
                              }
                            >
                              <div className="flex gap-5 justify-between items-center">
                                <Input
                                  type="text"
                                  placeholder="Enter unit name"
                                  value={unitName.unitName}
                                  onChange={(e) =>
                                    handleUnitNameChange(
                                      site.id,
                                      controlCenter.id,
                                      unitName.id,
                                      e.target.value
                                    )
                                  }
                                />
                                {/* Delete unitname-btn  */}
                                <div
                                  className={`${
                                    controlCenter.unitNames.length !== 1
                                      ? "flex justify-end items-center"
                                      : "hidden"
                                  }`}
                                >
                                  <Button
                                    icon={<DeleteOutlined />}
                                    type="primary"
                                    style={{ backgroundColor: "red" }}
                                    onClick={() =>
                                      handleDeleteUnitName(
                                        site.id,
                                        controlCenter.id,
                                        unitName.id
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </Form.Item>
                          </div>
                        ))}
                        {/* Add unitname-btn */}
                        <div className="flex justify-start items-center mt-3">
                          <Button
                            onClick={() =>
                              handleAddUnitName(site.id, controlCenter.id)
                            }
                            size="small"
                            icon={<PlusOutlined />}
                            type="default"
                          >
                            Add Unit Name
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Add control-center-btn */}
                <div className="flex justify-start items-center mb-4 ml-2">
                  <Button
                    onClick={() => handleAddControlCenter(site.id)}
                    size="small"
                    icon={<PlusOutlined />}
                    type="default"
                  >
                    Add Control Center
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-start items-center mb-4">
        <Button onClick={handleAddSite} icon={<PlusOutlined />} type="default">
          Add site
        </Button>
      </div>
    </div>
  );
};

export default Sites;
