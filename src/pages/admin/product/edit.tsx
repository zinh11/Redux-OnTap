import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input, notification } from 'antd';
import { useGetProductQuery, useUpdateProductMutation } from '../../../services/product.service';
import { useEffect } from 'react';


const ProductUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: getOneProduct } = useGetProductQuery(id);
    const [form] = Form.useForm();
    const [updateProduct] = useUpdateProductMutation();

    useEffect(() => {
        if (getOneProduct) {
            form.setFieldsValue(getOneProduct);
        }
    }, [getOneProduct, form]);

    const onFinish = async (values: any) => {
        try {
            await updateProduct(values);
            navigate('/');
            notification.success({
                message: 'Update Successful',
                description: `The product ${values.name} has been updated.`,
                duration: 2,
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <Form form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish} >
                <Form.Item
                    label=""
                    name="id"
                    style={{ display: 'none' }}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input your Price Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Price must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProductUpdate