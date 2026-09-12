export function formatEmployeeName(employee) {
    const firstName = employee?.first_name?.trim() || '';
    const middleName = employee?.middle_name?.trim() || '';
    const lastName = employee?.last_name?.trim() || '';
    const middleInitial = middleName ? `${Array.from(middleName)[0].toUpperCase()}.` : '';

    return [firstName, middleInitial, lastName].filter(Boolean).join(' ');
}
