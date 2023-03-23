import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

function InfiniteScroll() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchItems = () => {
        fetch(``)
    };

    return (
        <InfiniteScroll
            pageStart={1}
            loadMore={fetchItems}
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            {items}
        </InfiniteScroll>
    )
}