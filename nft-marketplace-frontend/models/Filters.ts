type Filters = {
    bottomPrice: number | null,
    topPrice: number | null,
    winery: string,
    year: number | undefined,
    count: number,
    sortField: string | undefined,
    sortOrder: string | undefined
};

export default Filters;