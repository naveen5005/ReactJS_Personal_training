import { Component } from "react";
import { connect } from "react-redux";
import { handleAddProductAction, handleDeleteProductAction, handleUpdateProductAction } from "../Store/action";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                prodName: "",
                prodDes: ""
            },
            index: null
        }
    }
    handleChange = (e) => {
        const newProduct = { ...this.state.product };
        newProduct[e.target.name] = e.target.value;
        this.setState({ product: newProduct })
    }
    handleAddProduct = () => {
        console.log(this.state.product)
        this.props.addProduct(this.state.product);
        this.clearForm();
    }
    handleDeleteProduct = (prod, index) => {
        this.props.deleteProduct({ ...prod, index })
    }
    handleEditProduct = (prod,i) => {
        this.setState({ product: prod, index : i });
    }
    handleUpdateProduct = () => {
        const {index} = this.state;
        this.props.updateProduct({...this.state.product,index});
        this.clearForm();
        this.setState({index:null});
    }
    clearForm = () => {
        this.setState({
            product: {
                prodName: "",
                prodDes: ""
            }
        })
    }
    render() {
        const { prodName, prodDes } = this.state.product;
        const {index} = this.state;
        const { products } = this.props;
        return (
            <div>
                <div>
                    <form action="">
                        <label htmlFor="">Product Name : </label>
                        <input type="text" name="prodName" value={prodName} onChange={this.handleChange} /> <br />
                        <label htmlFor="">Product Description : </label>
                        <input type="text" name="prodDes" value={prodDes} onChange={this.handleChange} /> <br />
                        {
                            index === null ? <button type="button" onClick={this.handleAddProduct}>Add Products</button>
                            : <button type="button" onClick={this.handleUpdateProduct}>update Products</button>
                        }
                    </form>
                </div>
                <div>
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((prod, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{prod.prodName}</td>
                                            <td>{prod.prodDes}</td>
                                            <td>
                                                <button type="button" onClick={() => this.handleEditProduct(prod,i)}>Edit</button>
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => this.handleDeleteProduct(prod, i)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addProduct: (product) => dispatch(handleAddProductAction(product)),
        deleteProduct: (product) => dispatch(handleDeleteProductAction(product)),
        updateProduct: (product) => dispatch(handleUpdateProductAction(product))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);