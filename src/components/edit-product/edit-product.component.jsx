import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import FormSelect from "../form-select/form-select.component";
import FormUpload from "../form-upload/form-upload.component";
import CustomButton from "../custom-button/custom-button.component";

import { EditProductContainer } from "./edit-product.styles";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  editCollectionStart,
  fetchCollectionsStart,
} from "../../redux/shop/shop.actions";
import {
  selectCollectionsCategory,
  selectCollectionByProductId,
} from "../../redux/shop/shop.selectors";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      stock: "",
      category: "choose",
      imageAsFile: "",
      imageUrl: null,
    };
  }

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;

    fetchCollectionsStart();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousProps.collectionByProductId !== this.props.collectionByProductId
    ) {
      const {
        collectionByProductId: { imageUrl, name, price, stock, categoryId },
      } = this.props;

      this.setState({
        name,
        price,
        stock,
        imageUrl,
        category: categoryId,
      });
    }
  }

  handleImageAsFile = (e) => {
    const image = e.target.files[0];
    this.setState({
      imageAsFile: image,
      imageUrl: URL.createObjectURL(image),
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { editCollectionStart, collectionByProductId } = this.props;
    const { category } = this.state;

    const data = this.state;

    data.id = collectionByProductId.id;

    editCollectionStart({
      categoryId: category,
      data: data,
    });
  };

  render() {
    const { name, price, stock, category, imageUrl } = this.state;
    const { collectionCategory } = this.props;

    return (
      <EditProductContainer>
        <form onSubmit={this.handleSubmit}>
          <FormUpload onChange={this.handleImageAsFile} imageUrl={imageUrl} />
          <FormSelect
            value={category}
            label="Kategori produk"
            name="category"
            onChange={this.handleChange}
          >
            <option value="choose">Pilih kategori produk</option>
            {collectionCategory.map(({ id, title }) => (
              <option value={id}>{title}</option>
            ))}
          </FormSelect>
          <FormInput
            name="name"
            type="text"
            handleChange={this.handleChange}
            value={name}
            label="Nama Produk"
            // required
          />
          <FormInput
            name="price"
            type="number"
            value={price}
            handleChange={this.handleChange}
            label="Harga"
            // required
          />
          <FormInput
            name="stock"
            type="number"
            value={stock}
            handleChange={this.handleChange}
            label="Jumlah stok"
            // required
          />
          <CustomButton type="submit"> Tambah Produk </CustomButton>
        </form>
      </EditProductContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collectionCategory: selectCollectionsCategory,
  collectionByProductId: selectCollectionByProductId,
});

const mapDispatchToProps = (dispatch) => ({
  editCollectionStart: (data) => dispatch(editCollectionStart(data)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
