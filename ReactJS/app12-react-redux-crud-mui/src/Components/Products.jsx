import React, { Component } from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { connect } from 'react-redux';
import { handleAddProductAction, handleDeleteProductAction, handleUpdateProductAction } from '../Store/actions';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                id: "",
                prodName: "",
                prodDes: ""
            },
            index: null,
            columns: [
                { field: 'prodName', headerName: 'Product name', width: 130 },
                { field: 'prodDes', headerName: 'Product Description', width: 500 },
                {
                    field: 'actions', headerName: 'Actions', width: 130, renderCell: (params) => (
                        <div>
                            <IconButton
                                aria-label="edit"
                                onClick={() => this.handleEdit(params.row)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={() => this.props.deleteProduct(params.row.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ),
                }
            ]
        }
    }



    handleChange = (e) => {
        console.log(e)
        const newProduct = { ...this.state.product };
        newProduct.id === '' ? newProduct.id = Math.round(Math.random() * 100) : newProduct.id = this.state.product.id;
        newProduct[e.target.name] = e.target.value;
        this.setState({ product: newProduct });
    }
    handleEdit = (row) => {
        this.setState({ product: row, index: row.id });

    }
    handleAddFunc = (product) => {
        this.props.addProducts(product);
        this.clearForm();
    }
    handleUpdateFunc = (product) => {
        this.props.updateProduct(product);
        this.setState({ index: null });
        this.clearForm();
    }
    clearForm = () => {
        this.setState({
            product: {
                id: "",
                prodName: "",
                prodDes: ""
            }
        })
    }
    render() {
        const { prodName, prodDes } = this.state.product;
        const { product, columns } = this.state;
        const { products } = this.props;

        return (
            <div style={{ marginTop: '100px' }}>
                <FormControl>
                    <TextField id="outlined-basic" label="Product Name" type='text' variant="outlined" name='prodName' value={prodName} onChange={this.handleChange} /> <br />
                    <TextField id="outlined-basic" label="Product Description" type='text' variant="outlined" name='prodDes' value={prodDes} onChange={this.handleChange} /> <br />
                    {
                        this.state.index === null ? <Button variant="contained" onClick={() => this.handleAddFunc(product)} >Add Product</Button>
                            : <Button variant="contained" onClick={() => this.handleUpdateFunc(product)} >Update Product</Button>
                    }
                </FormControl> <br /><br />

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={products}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        // key={products.id}
                        getRowId={products.id}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addProducts: (product) => dispatch(handleAddProductAction(product)),
        deleteProduct: (productId) => dispatch(handleDeleteProductAction(productId)),
        updateProduct: (product) => dispatch(handleUpdateProductAction(product))
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(Products);