import { Fragment, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator,
} from '@/Components/ui/dropdown-menu';

const RegistrationStationPicker = ({ stations, value, onChange, error }) => {
    const selected = stations.find(station => String(station.id) === String(value));
    const [portalContainer, setPortalContainer] = useState(null);

    return <div className="col-span-full min-w-0">
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger id="register-station" type="button" className="flex min-h-[54px] w-full items-center justify-between gap-3 rounded-xl border-2 border-[#665080] bg-[#100c1c] px-[15px] py-[13px] text-left text-base text-white transition-colors hover:border-[#b388db] data-[popup-open]:border-[#b388db] aria-[invalid=true]:border-[#ff9b78] min-[541px]:text-sm [&>span]:truncate" disabled={!stations.length} aria-label={selected ? `Station: ${selected.name}` : 'Choose your station'} aria-invalid={Boolean(error)} aria-describedby={error ? 'register-station-error' : undefined}>
                <span>{selected?.name || 'Choose your station'}</span><ChevronDown className="shrink-0 text-[#c4b6d6]" size={18} strokeWidth={1.8} aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent portalContainer={portalContainer} positionerClassName="!z-[80]" className="!w-[var(--anchor-width)] max-w-[calc(100vw-32px)] !max-h-[min(300px,var(--available-height,300px))] overflow-y-auto overscroll-contain rounded-lg border border-[#665080] !bg-[#1c1428] p-1 !text-[#f5f0fc] shadow-[0_8px_24px_#0005] [scrollbar-color:#765094_#1c1428]" sideOffset={8}>
                {[{ type: 'school', label: 'Schools' }, { type: 'sdo_office', label: 'SDO Units' }].map((group, index) => <Fragment key={group.type}>
                    {index > 0 && <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-[#443250]" />}
                    <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-[10px] py-2 text-xs font-semibold text-[#c4b6d6]">{group.label}</DropdownMenuLabel>
                    {stations.filter(station => station.type === group.type).map(station => <DropdownMenuItem key={station.id} className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded px-[10px] py-2 data-[highlighted]:bg-[#382449] [&_strong]:block [&_strong]:whitespace-normal [&_strong]:break-words [&_strong]:text-sm [&_strong]:font-normal [&_strong]:leading-normal [&_small]:mt-[3px] [&_small]:block [&_small]:text-[10px] [&_small]:text-[#b9a9cb]" onClick={() => onChange(String(station.id))}>
                    <span><strong>{station.name}</strong>{station.school_code && <small>{station.school_code}</small>}</span>
                    {String(value) === String(station.id) && <span className="text-[#00f5d4]" aria-hidden="true">✓</span>}
                    </DropdownMenuItem>)}
                    </DropdownMenuGroup>
                </Fragment>)}
            </DropdownMenuContent>
        </DropdownMenu>
        <div ref={setPortalContainer} />
        {error && <p id="register-station-error" role="alert" className="mt-2 text-xs leading-normal text-[#ffbca4]">{error}</p>}
        {!stations.length && <p className="mt-2 text-xs leading-normal text-[#ffbca4]">No stations available. Please contact your administrator.</p>}
    </div>;
};

export default RegistrationStationPicker;
