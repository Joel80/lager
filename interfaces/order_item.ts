// Interface for orderItem, defines the properties and
    // their types for an orderItem
    export default interface OrderItem {
        name: string; 
        stock: number; 
        article_number: string; 
        description: string; 
        specifiers: string; 
        location: string; 
        price: number;
    }