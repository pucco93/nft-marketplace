import { useEffect, useState } from "react";
import styles from "../NFTGrid.module.scss";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Input,
  Tag,
  TagLabel,
  FormControl,
  FormLabel,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCount,
  setPrices,
  setWinery,
  setYear,
  setSortField,
  setSortOrder,
  cleanFilters,
} from "../../../store/slices/FiltersSlice";
import { Select } from "@chakra-ui/react";
import { RootState } from "../../../store/appStore";
import {
  getCount,
  getPrices,
  getYear,
  getSortField,
  getSortOrder,
} from "../../../store/selectors";

const Filters = () => {
  const dispatch = useDispatch();
  const [yearOptions, updateYearOptions] = useState<number[]>([]);
  const countOptions = [12, 24, 36];
  const size = "lg";

  const selectedCount = useSelector((state: RootState) => getCount(state));
  const selectedYear = useSelector((state: RootState) => getYear(state));
  const selectedSortField = useSelector((state: RootState) =>
    getSortField(state)
  );
  const selectedSortOrder = useSelector((state: RootState) =>
    getSortOrder(state)
  );
  const { bottomPrice, upperPrice } = useSelector((state: RootState) =>
    getPrices(state)
  );

  const numberOrder = [{key: 'desc', label: "Dal piú nuovo"}, {key: 'asc', label:  "Dal piú vecchio"}];
  const alphaOrder = [{key: 'a-z', label: "Dalla A alla Z"}, {key: 'z-a', label: "Dalla Z alla A"}];
  const priceOrder = [{key: 'desc', label: "Prezzo piú alto"}, {key: 'asc', label: "Prezzo piú basso"}];

  const changePrice = (value: number[]) => {
    dispatch(
      setPrices({
        bottomPrice: value[0],
        topPrice: value[1],
      })
    );
  };

  const selectOptions = () => {
    let from: number = new Date().getFullYear() - 10;
    const array = Array(50)
      .fill(from)
      .map((n, i) => n + i);
    updateYearOptions(array);
  };

  const onYearChange = (event: any) => {
    dispatch(setYear(Number(event.target.value)));
  };

  const onWineryChange = (event: any) => {
    dispatch(setWinery(event.target.value));
  };

  const updateCount = (newCount: number) => {
    dispatch(setCount(newCount));
  };

  const onSortFieldChange = (event: any) => {
    dispatch(
      setSortField(
        event.target.value === "noSorting" ? undefined : event.target.value
      )
    );
    dispatch(setSortOrder(undefined));
  };

  const onSortOrderChange = (event: any) => {
    dispatch(setSortOrder(event.target.value));
  };

  const _cleanFilters = () => {
    dispatch(cleanFilters());
  };

  useEffect(() => {
    selectOptions();
  }, []);

  return (
    <>
      <div className={styles.titleFilter}>Filtri</div>
      <FormControl className={styles.priceFilter}>
        <FormLabel className={styles.priceLabel}>Prezzo</FormLabel>
        <RangeSlider
          defaultValue={[0, 10]}
          min={0}
          max={10}
          step={0.01}
          onChangeEnd={changePrice}
        >
          <RangeSliderTrack bg="customPrimary.100">
            <RangeSliderFilledTrack bg="customPrimary.900" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
          <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
        <div className={styles.pricesContainer}>
          <div className={styles.lowerPrice}>{bottomPrice}</div>
          <div className={styles.upperPrice}>{upperPrice}</div>
        </div>
      </FormControl>
      <FormControl className={styles.yearFilter}>
        <FormLabel className={styles.yearLabel}>Anno di produzione</FormLabel>
        <Select
          variant="outline"
          placeholder="Seleziona l'anno"
          colorScheme="customPrimary"
          className={styles.yearInput}
          onChange={onYearChange}
          value={selectedYear}
        >
          {yearOptions?.map((year: number, index: number) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </FormControl>
      <Tooltip label="Questo filtro non é disponibile al momento.">
        <FormControl className={styles.wineryFilter} isDisabled>
          <FormLabel className={styles.wineryLabel}>Cantina</FormLabel>
          <Input
            colorScheme="customPrimary"
            variant="outline"
            type="text"
            className={styles.wineryInput}
            onChange={onWineryChange}
          />
        </FormControl>
      </Tooltip>
      <FormControl className={styles.countFilter}>
        <FormLabel className={styles.countLabel}>Elementi per pagina</FormLabel>
        <div className={styles.countOptions}>
          {countOptions.map((count: number, index: number) => (
            <Tag
              size={size}
              key={index}
              borderRadius="full"
              variant={selectedCount === count ? "solid" : "outline"}
              colorScheme="customPrimary"
              className={styles.countOption}
              onClick={() => updateCount(count)}
            >
              <TagLabel>{count}</TagLabel>
              {/* {selectedCount === count && (
                <TagCloseButton onClick={removeCount} />
              )} */}
            </Tag>
          ))}
        </div>
      </FormControl>
      <FormControl className={styles.sortingControl}>
        <FormLabel>Ordinamento</FormLabel>
        <div className={styles.sortContainer}>
          <Select
            variant="outline"
            placeholder="Seleziona campo"
            colorScheme="customPrimary"
            className={styles.sortInput}
            onChange={onSortFieldChange}
            value={selectedSortField}
          >
            <option key="noSorting" value="noSorting">
              Nessun ordinamento
            </option>
            <option key="year" value="year">
              Anno di produzione
            </option>
            <option key="name" value="name">
              Nome
            </option>
            <option key="price" value="price">
              Prezzo
            </option>
          </Select>
        </div>
        <div className={styles.sortContainer}>
          <Select
            variant="outline"
            placeholder="Seleziona ordinamento"
            colorScheme="customPrimary"
            className={styles.sortInput}
            onChange={onSortOrderChange}
            value={selectedSortOrder}
            isDisabled={!selectedSortField}
          >
            {(selectedSortField === 'name' ? alphaOrder : selectedSortField === 'cost' ? priceOrder : numberOrder).map(
              (item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              )
            )}
          </Select>
        </div>
      </FormControl>
      <FormControl className={styles.resetControl}>
        <div onClick={_cleanFilters} className={styles.resetButton}>
          Azzera filtri
        </div>
      </FormControl>
    </>
  );
};

export default Filters;
