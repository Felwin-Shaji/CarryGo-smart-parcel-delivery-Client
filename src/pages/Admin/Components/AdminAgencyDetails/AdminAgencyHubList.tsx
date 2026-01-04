import { useMemo } from 'react'
import { DataTable } from '../../../../components/Table/Table';
import { AdminHubColumns } from '../../../../config/TableColumns/AdminAgencyHubTableColumn';
import toast from 'react-hot-toast';
import { FiPackage } from "react-icons/fi";
import type { HubResponseDTO } from '../../../../Services/Agency/Agency';

type AdminAgencyHubListProps = {
    hubs: HubResponseDTO[];
};

const AdminAgencyHubList = ({
    hubs,
}: AdminAgencyHubListProps) => {

    const handleViewHub = (hub: HubResponseDTO) => {
        toast.success(`Viewing ${hub.name}`);
    };

    const columns = useMemo(
        () => AdminHubColumns(handleViewHub),
        []
    );

    return (
        <>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Hubs Under Agency
            </h3>

            <DataTable
                columns={columns}
                data={hubs}
            />
        </>
    );
};

export default AdminAgencyHubList



export const EmptyHubsState = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <FiPackage className="text-4xl text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-700">
                No hubs added yet
            </h3>
            <p className="text-sm text-gray-500 mt-1">
                This agency has no hubs associated with it.
            </p>
        </div>
    );
};
