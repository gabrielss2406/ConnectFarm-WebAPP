export const localizedTextsMap = {
    columnMenuUnsort: 'não classificado',
    columnMenuSortAsc: 'Classificar por ordem crescente',
    columnMenuSortDesc: 'Classificar por ordem decrescente',
    columnMenuFilter: 'Filtro',
    columnMenuHideColumn: 'Ocultar',
    columnMenuShowColumns: 'Mostrar colunas',
    columnMenuManageColumns: 'Organizar colunas',
    noRowsLabel: 'Nenhuma linha',
    noResultsOverlayLabel: 'Nenhum resultado encontrado',
    errorOverlayDefaultLabel: 'Ocorreu um erro',
    footerRowSelected: (count: number) => `${count} linha(s) selecionada(s)`,
    footerTotalRows: 'Total de linhas: {{count}}',
    rowsPerPage: 'Linhas por página:',
    MuiTablePagination: {
        labelDisplayedRows: ({ from, to, count }) => `${from}–${to} de ${count}`,
        labelRowsPerPage: "Linhas por página"
    },
};