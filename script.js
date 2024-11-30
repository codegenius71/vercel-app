const mongoose = require('mongoose');
const Item = require('./models/item'); // Adjust the path as needed to your model file

mongoose.connect("mongodb+srv://geniuscoders964:wakanda323@cluster0.hjujv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Full corrected dummy data (formatted as an array of objects)
const dummyData = [
    {
        name: "Nike React Infinity Run Flyknit",
        brand: "NIKE",
        gender: "MEN",
        category: "RUNNING",
        price: 160,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
        slug: "nike-react-infinity-run-flyknit"
    },
    {
        name: "Nike React Miler",
        brand: "NIKE",
        gender: "MEN",
        category: "RUNNING",
        price: 130,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg",
        slug: "nike-react-miler"
    },
    {
        name: "Nike Air Zoom Pegasus 37",
        brand: "NIKE",
        gender: "WOMEN",
        category: "RUNNING",
        price: 120,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg",
        slug: "nike-air-zoom-pegasus-37"
    },
    {
        name: "Nike Joyride Run Flyknit",
        brand: "NIKE",
        gender: "WOMEN",
        category: "RUNNING",
        price: 180,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg",
        slug: "nike-joyride-run-flyknit"
    },
    {
        name: "Nike Mercurial Vapor 13 Elite FG",
        brand: "NIKE",
        gender: "WOMEN",
        category: "FOOTBALL",
        price: 250,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg",
        slug: "nike-mercurial-vapor-13-elite-fg"
    },
    {
        name: "Nike Phantom Vision Elite Dynamic Fit FG",
        brand: "NIKE",
        gender: "WOMEN",
        category: "FOOTBALL",
        price: 150,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/s1amp7uosrn0nqpsxeue/phantom-vision-elite-dynamic-fit-fg-firm-ground-soccer-cleat-19Kv1V.jpg",
        slug: "nike-phantom-vision-elite-dynamic-fit-fg"
    },
    {
        name: "Nike Phantom Venom Academy FG",
        brand: "NIKE",
        gender: "WOMEN",
        category: "FOOTBALL",
        price: 80,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/whegph8z9ornhxklc8rp/phantom-venom-academy-fg-firm-ground-soccer-cleat-6JVNll.jpg",
        slug: "nike-phantom-venom-academy-fg"
    },
    {
        name: "Nike Mercurial Vapor 13 Elite Tech Craft FG",
        brand: "NIKE",
        gender: "MEN",
        category: "FOOTBALL",
        price: 145,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vhbwnkor8sxt8qtecgia/mercurial-vapor-13-elite-tech-craft-fg-firm-ground-soccer-cleat-l38JPj.jpg",
        slug: "nike-mercurial-vapor-13-elite-tech-craft-fg"
    },
    {
        name: "Nike Mercurial Superfly 7 Pro MDS FG",
        brand: "NIKE",
        gender: "MEN",
        category: "FOOTBALL",
        price: 137,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-a52a8aec-22dc-4982-961b-75c5f4c72805/mercurial-superfly-7-pro-mds-fg-firm-ground-soccer-cleat-mhcpdN.jpg",
        slug: "nike-mercurial-superfly-7-pro-mds-fg"
    },
    {
        name: "Nike Air Force 1",
        brand: "NIKE",
        gender: "KIDS",
        category: "CASUAL",
        price: 90,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/178b2a46-3ee4-492b-882e-f71efdd53a36/air-force-1-big-kids-shoe-2zqp8D.jpg",
        slug: "nike-air-force-1"
    },
    {
        name: "Nike Air Max 270 React",
        brand: "NIKE",
        gender: "MEN",
        category: "CASUAL",
        price: 150,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0063e040-c1e9-47e2-bf9e-6f3bdf7976f3/air-max-270-react-mens-shoe-wbdbhv.jpg",
        slug: "nike-air-max-270-react"
    },
    {
        name: "Nike Air Max 90",
        brand: "NIKE",
        gender: "MEN",
        category: "CASUAL",
        price: 120,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1b62f81d-f86f-4f1f-93d7-1a7364969fc3/air-max-90-mens-shoe-gZl0K3.jpg",
        slug: "nike-air-max-90"
    },
    {
        name: "Nike Air Max 97",
        brand: "NIKE",
        gender: "MEN",
        category: "CASUAL",
        price: 170,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/394bc7c8-0c2f-4774-b5ad-b5fcb078f43e/air-max-97-mens-shoe-gBrfFk.jpg",
        slug: "nike-air-max-97"
    },
    {
        name: "Nike Air Max Plus",
        brand: "NIKE",
        gender: "MEN",
        category: "CASUAL",
        price: 160,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5d67acfb-65ef-441f-b460-2265a9301d8b/air-max-plus-mens-shoe-4zR7pq.jpg",
        slug: "nike-air-max-plus"
    },
    {
        name: "Nike Air Zoom Vomero 14",
        brand: "NIKE",
        gender: "MEN",
        category: "RUNNING",
        price: 130,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f1c6275-c083-4885-8b5f-141f4a8de8e3/air-zoom-vomero-14-mens-road-running-shoe-nkbU1p.jpg",
        slug: "nike-air-zoom-vomero-14"
    },
    {
        name: "Nike Free RN 5.0",
        brand: "NIKE",
        gender: "MEN",
        category: "RUNNING",
        price: 110,
        items_left: 3,
        imageURL: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/13a7c242-e82c-42a2-9b84-3d4b00f3f988/free-rn-5-0-mens-road-running-shoe-pkFmfx.jpg",
        slug: "nike-free-rn-5-0"
    }
];

// Insert the dummy data into MongoDB
const insertDummyData = async () => {
    try {
        // Insert the entire dummy data array
        await Item.insertMany(dummyData);
        console.log('Dummy data inserted successfully!');
    } catch (error) {
        console.error('Error inserting dummy data:', error.message);
    }
};

// Call the insert function
insertDummyData();
