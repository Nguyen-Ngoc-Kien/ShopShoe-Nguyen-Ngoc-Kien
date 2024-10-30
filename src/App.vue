<template>
  <div class="container mx-auto">
    <header class="bg-white shadow-md flex items-center justify-between h-16 fixed top-0 left-0 w-full z-50 px-10">
      <div class="logo">
        <img src="../public/assets/Logo.jpg" alt="Logo" class="w-12 h-12 object-contain rounded-md">
      </div>
      <div class="cart flex items-center cursor-pointer relative right-[60px]" @click="toggleCart">
  <i class="fas fa-shopping-cart text-gray-700 text-xl"></i>
  <span class="ml-2 text-gray-700">{{ translations.cart }}</span>
  <div v-if="isCartVisible" class="cart border border-gray-300 rounded-lg shadow-lg absolute p-4 bg-white top-[45px] w-[350px] -right-[95px] flex flex-col gap-[10px] overflow-hidden z-50">
    <h2 class="text-center text-2xl font-bold">{{ translations.cartTitle }}</h2>
    <div class="border-b-[1px] border-gray-300"></div>

    <p v-if="cartItems.length === 0" class="text-center text-gray-500 py-4">
      {{ translations.emptyCart }}
    </p>

    <ul v-else class="flex-col flex gap-2.5 max-h-[300px] overflow-y-auto">
      <li v-for="item in cartItems" :key="item.product.id + item.size + item.color" class="flex justify-between items-center p-2 hover:bg-gray-50 rounded" @click.stop>
        <div class="flex gap-2">
          <img :src="item.product.images[item.color]" alt="" class="w-16 h-16 object-cover rounded"/>
          <div>
            <p class="font-medium">{{ item.product.name[currentLanguage] }}</p>
            <p class="text-sm text-gray-600">{{ formatPrice(item.product.price) }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button @click.stop="updateQuantity(item, -1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" :disabled="item.quantity <= 1">
            -
          </button>
          <span class="w-8 text-center">{{ item.quantity }}</span>
          <button @click.stop="updateQuantity(item, 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
            +
          </button>
          <button @click.stop="removeFromCart(item.product.id)" class="ml-2 text-red-500 hover:text-red-700">
            <span class="material-icons">delete</span>
          </button>
        </div>
      </li>
    </ul>

    <div class="border-t-[1px] border-gray-300 mt-2 pt-2">
      <div class="flex justify-between items-center text-xl font-bold">
        <p>{{ translations.total }}:</p>
        <p class="text-red-700">{{ formatPrice(totalAmount) }}</p>
      </div>
      <button
        @click="checkout"
        class="w-full h-[40px] mt-2 rounded-[10px] bg-green-500 hover:bg-green-600 text-white text-[16px] transition-colors"
      >
        {{ translations.checkout }}
      </button>
    </div>
  </div>
</div>
    </header>

    <div class="container-body p-10 pt-[80px]">
      <h1 class="text-4xl font-bold text-center mb-8">{{ translations.productListTitle }}</h1>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <li v-for="product in products" :key="product.id" class="border rounded-lg p-4 bg-white shadow-lg transition-transform transform hover:scale-105">
          <span class="badge inline-block px-3 py-1 text-white font-bold rounded-full"
            :class="{ 'bg-red-500': product.isBestSeller, 'bg-gray-400': !product.isBestSeller }">
            {{ product.isBestSeller ? translations.bestSeller : translations.notBestSeller }}
          </span>

          <img 
            :src="product.images[selectedColor[product.id]?.color || product.colorOptions[0]]"
            :alt="product.name" 
            class="w-full h-48 object-cover rounded-md mt-2"
          />

          <h2 class="text-lg font-semibold mt-2">{{ product.name[currentLanguage] }}</h2>
          <i class="text-orange-600 text-xl font-bold">{{ translations.price }}: {{ formatPrice(product.price) }}</i>
          <p class="text-gray-600"><b>{{ translations.releaseDate }}:</b> <span>{{ formatDate(product.releaseDate) }}</span></p>
          <p class="text-gray-600 "> <b>{{ translations.brand }}:</b> <span>{{ product.brand[currentLanguage] }}</span></p>
          <p class="text-gray-800">{{ product.description[currentLanguage] }}</p>

          <p class="text-gray-800 font-bold">{{ translations.availableQuantity }}: <span>{{ getAvailableQuantity(product) }}</span></p>

          <p class="mt-2 mb-2 font-bold">{{ translations.selectSize }}</p>
          <div class="flex gap-[20px] flex-wrap">
            <div
              v-for="size in sizeOptions"
              :key="size"
              @click="selectSize(product.id, size)"
              :class="{
                'border-2 border-gray-300 rounded-md cursor-pointer p-2 text-center transition-transform w-[40px] h-[40px]': true,
                'bg-blue-500 text-white': selectedSize[product.id] === size,
                'hover:bg-gray-100': selectedSize[product.id] !== size
              }"
            >
              {{ size }}
            </div>
          </div>

          <p class="mt-2 font-bold">{{ translations.selectColor }}</p>
          <div class="flex space-x-2 mb-2 gap-[10px] mt-3">
            <button
              v-for="color in product.colorOptions"
              :key="color"
              :style="{ backgroundColor: color.toLowerCase() }"
              @mouseover="changeImageOnHover(product.id, color)"
              @mouseleave="resetImage(product.id)"
              @click="selectColor(product.id, color)"
              class="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
            ></button>
          </div>

          <button
            @click="addToCart(product)"
            :disabled="getAvailableQuantity(product) === 0"
            class="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-300 transition float-right"
          >
            {{ translations.addToCart }}
          </button>
        </li>
      </ul>
    </div>

    <div 
      class="global fixed bottom-4 right-4 flex flex-col items-end"
      @click="toggleLanguageMenu"
    >
      <div class="p-3 rounded-full bg-gray-800 text-white cursor-pointer shadow-lg hover:bg-gray-700 transition">
        <i class="fas fa-globe"></i>
      </div>

      <div 
        v-if="isLanguageMenuVisible" 
        class="bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-40 text-center transition-opacity duration-200"
      >
        <ul>
          <li @click="setLanguage('zh')" class="p-2 hover:bg-gray-100 cursor-pointer">{{ translations.chinese }}</li>
          <li @click="setLanguage('vi')" class="p-2 hover:bg-gray-100 cursor-pointer">{{ translations.vietnamese }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from './data';


export default {
  name: 'ProductList',
  data() {
    return {
      products,
      selectedColor: {},
      selectedSize: {},
      sizeOptions: [36, 37, 38, 39, 40, 41, 42],
      cartItems: [],
      isCartVisible: false,
      isLanguageMenuVisible: false,
      currentLanguage: 'vi', 
      translations: {
        cart: 'Giỏ hàng',
        cartTitle: 'Giỏ hàng của bạn',
        color: 'Màu sắc',
        size: 'Kích thước',
        quantity: 'Số lượng',
        total: 'Thành tiền',
        totalAmount: 'Tổng tiền',
        checkout: 'Thanh toán ngay',
        productListTitle: 'Danh sách giày',
        bestSeller: 'Bán chạy',
        notBestSeller: 'Bán không chạy',
        price: 'Giá',
        releaseDate: 'Ngày phát hành',
        brand: 'Nhãn hiệu',
        availableQuantity: 'Số lượng còn lại',
        selectSize: 'Chọn kích thước:',
        selectColor: 'Chọn màu sắc:',
        addToCart: 'Thêm vào giỏ',
        chinese: 'Trung Quốc',
        vietnamese: 'Việt Nam',
      },
    };
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },
  },
  methods: {
  updateQuantity(item, change) {
    const cartItem = this.cartItems.find(cartItem => cartItem.product.id === item.product.id && cartItem.size === item.size && cartItem.color === item.color);
    
    if (cartItem) {
      cartItem.quantity += change;

      if (cartItem.quantity < 1) {
        cartItem.quantity = 1;
      }
      
      this.updateTotalAmount();
    }
  },
  removeFromCart(productId) {
    const index = this.cartItems.findIndex(item => item.product.id === productId);
    
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      
      this.updateTotalAmount();
    }
  },
  
  updateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  },
    formatPrice(amount) {
    if (this.currentLanguage === 'zh') {
      return `${amount} 元`;
    } else {
      return (amount * 3500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND'; 
    }
  },
  
  formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    if (this.currentLanguage === 'zh') {
      return `${year}年${month}月${day}日`; 
    }
    return `Ngày ${day} tháng ${month} năm ${year}`;
  },
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },
    toggleLanguageMenu() {
      this.isLanguageMenuVisible = !this.isLanguageMenuVisible;
    },
    setLanguage(lang) {
      this.currentLanguage = lang;
      if (lang === 'zh') {
        this.translations = {
          cart: '购物车',
          cartTitle: '您的购物车',
          color: '颜色',
          size: '尺寸',
          quantity: '数量',
          total: '总计',
          totalAmount: '总金额',
          checkout: '立即结算',
          productListTitle: '鞋子列表',
          bestSeller: '热销',
          notBestSeller: '不畅销',
          price: '价格',
          releaseDate: '发布日期',
          brand: '品牌',
          availableQuantity: '剩余数量',
          selectSize: '选择尺寸:',
          selectColor: '选择颜色:',
          addToCart: '加入购物车',
          chinese: '中国',
          vietnamese: '越南',
        };
      } else {
        this.translations = {
          cart: 'Giỏ hàng',
          cartTitle: 'Giỏ hàng của bạn',
          color: 'Màu sắc',
          size: 'Kích thước',
          quantity: 'Số lượng',
          total: 'Thành tiền',
          totalAmount: 'Tổng tiền',
          checkout: 'Thanh toán ngay',
          productListTitle: 'Danh sách giày',
          bestSeller: 'Bán chạy',
          notBestSeller: 'Bán không chạy',
          price: 'Giá',
          releaseDate: 'Ngày phát hành',
          brand: 'Nhãn hiệu',
          availableQuantity: 'Số lượng còn lại',
          selectSize: 'Chọn kích thước:',
          selectColor: 'Chọn màu sắc:',
          addToCart: 'Thêm vào giỏ',
          chinese: 'Trung Quốc',
          vietnamese: 'Việt Nam',
        };
      }
      this.isLanguageMenuVisible = false;
    },
    selectColor(productId, color) {
      this.selectedColor[productId] = { color };
    },
    selectSize(productId, size) {
      this.selectedSize[productId] = size; 
    },
    getAvailableQuantity(product) {
      const color = this.selectedColor[product.id]?.color || product.colorOptions[0];
      const size = this.selectedSize[product.id] || 36;
      return product.colors[color].quantity[size] || 0;
    },
    addToCart(product) {
      const color = this.selectedColor[product.id]?.color || product.colorOptions[0];
      const size = this.selectedSize[product.id] || 36;
      const availableQuantity = product.colors[color].quantity[size];

      if (availableQuantity > 0) {
        const existingItem = this.cartItems.find(item => 
          item.product.id === product.id && item.color === color && item.size === size
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.cartItems.push({
            product,
            color,
            size,
            quantity: 1,
          });
        }

        product.colors[color].quantity[size] -= 1;

        console.log(`Đã thêm ${product.name} (${color}, size ${size}) vào giỏ hàng.`);
        this.isCartVisible = true;
      } else {
        console.log('Sản phẩm không còn trong kho.');
      }
    },
    changeImageOnHover(productId, color) {
      this.selectedColor[productId] = { color };
    },
    resetImage(productId) {
      this.selectedColor[productId] = {
        color: this.selectedColor[productId]?.color || this.products[productId].colorOptions[0]
      };
    },
  },
};
</script>

<style scoped>
.badge {
  margin-bottom: 1rem;
}
.global {
  z-index: 60;
}
</style>
