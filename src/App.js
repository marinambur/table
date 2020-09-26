import React, {Component} from 'react';
import Loader from "./loader/Loader";
import DetailRowView from './detailRowView/DetailRowView';
import Table from "./table/Table";
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import TableSearch from './tableSearch/TableSearch';
import Input from "./input/Input";

class App extends Component {

    state = {
        isLoading: true,
        data: [],
        search: '',
        filteredData: [],
        sort: 'asc',  // 'desc'
        sortField: 'id', // поле по умолчанию
        row: null,
        currentPage: 0,
    }

    async componentDidMount() {
        const response = await fetch(`http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`)
        const data = await response.json()
        //console.log(data)
        this.setState({
            isLoading: false,
            data: _.orderBy(data, this.state.sortField, this.state.sort)
        })
    }

    onSort = sortField => {
        const cloneData = this.state.data.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
        const data = _.orderBy(cloneData, sortField, sort);
        this.setState({data, sort, sortField})
    }

    onRowSelect = row => (
        this.setState({row})
    )

    pageChangeHandler = ({selected}) => (
        this.setState({currentPage: selected})
    )

    searchHandler = search => {
        this.setState({search, currentPage: 0})
    }


    getFilteredData(){
        const {data, search} = this.state

        if (!search) {
            return data
        }
        var result = data.filter(item => {
            return (
                item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
                item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
                item["email"].toLowerCase().includes(search.toLowerCase())
            );
        });
        if(!result){
            return data
        }
        return result
    }



    render() {
        const pageSize = 10;

        const filteredData = this.getFilteredData();
        console.log(filteredData)
        const pageCount = Math.ceil(filteredData.length / pageSize)
        const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
        return (
            <div className="container">
                {
                    this.state.isLoading
                        ? <Loader/>
                        : <React.Fragment>
                        <Input/>
                            <TableSearch onSearch={this.searchHandler}/>
                            <Table
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
                            />
                        </React.Fragment>


                }
                {this.state.data.length > pageSize
                    ?
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.pageChangeHandler}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        nextClassName="page-item"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        forcePage={this.state.currentPage}
                    /> : null
                }
                {
                    this.state.row ? <DetailRowView person={this.state.row}/> : null
                }
            </div>
        );
    }
}

export default App;