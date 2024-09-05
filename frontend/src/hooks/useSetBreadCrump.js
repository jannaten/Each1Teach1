import { useState, useEffect } from "react";

const useSetBreadCrump = (initialDataArr, item, value = "name", path = "") => {
	const [data, setData] = useState(initialDataArr);

	const onAddItem = () => {
		if (item && item[value]) {
			const isValid = data.some((el) => el.label === item[value]);
			if (!isValid) {
				const newArr = [...data, { id: data.length + 1, label: item[value], path }];
				setData(newArr);
			}
		}
	};

	useEffect(() => {
		onAddItem();
	}, [item, value, path]);

	return { data };
};

export default useSetBreadCrump;
