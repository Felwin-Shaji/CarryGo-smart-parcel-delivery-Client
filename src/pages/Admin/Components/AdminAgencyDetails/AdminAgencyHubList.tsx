import { useMemo } from 'react'
import { DataTable } from '../../../../components/Table/Table';
import { AdminHubColumns } from '../../../../config/TableColumns/AdminAgencyHubTableColumn';
import { FiPackage } from "react-icons/fi";
import type { HubResponseDTO } from '../../../../constants_Types/types/Admin/AdminAgency.dto';
import { useNavigate } from 'react-router-dom';

type AdminAgencyHubListProps = {
    hubs: HubResponseDTO[];
    agencyId: string
};

const AdminAgencyHubList = ({ hubs, agencyId }: AdminAgencyHubListProps) => {
    const navigate = useNavigate();

    const handleViewHub = (hub: HubResponseDTO) => {
        navigate(`/admin/agency/${agencyId}/hubs/${hub.id}`);
    };

    const columns = useMemo(
        () => AdminHubColumns(handleViewHub),
        [agencyId]
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
