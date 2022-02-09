$(document).ready(function () {
  const arrProducts = [];
  // function for  adding products
  $("#add_product").click(function () {
    var sku = $("#product_sku").val();
    var name = $("#product_name").val();
    var price = $("#product_price").val();
    var quantity = $("#product_quantity").val();
    // console.log(sku, name, price, quantity);

    if (checkEmpty(sku, name, price, quantity)) {
      if (checkVals(sku, name, price, quantity)) {
        // console.log(checkVals(sku, name, price, quantity));
        if (arrProducts.find((x) => x.sku == sku)) {
          $(".success").hide();
          $(".error").show();
          $(".error_message").html(
            "SKU already exists!! </br> Please insert unique SKU."
          );
          $("#product_sku").css("border-color", "red");

          return;
        }
        arrProducts.push({
          sku: sku,
          name: name,
          price: price,
          quantity: quantity,
        });
        // console.log(arrProducts);
        display(arrProducts);
      }
    }
  });
  // display function
  function display(arr) {
    var table =
      "<table> <tr><th>SKU</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr> ";
    for (let i = 0; i < arr.length; i++) {
      table +=
        "<tr><td>" +
        arr[i].sku +
        "</td><td>" +
        arr[i].name +
        "</td><td>" +
        `$ ${arr[i].price}` +
        "</td> <td>" +
        arr[i].quantity +
        "  </td><td><a href='#e' class='edit' id=" +
        arr[i].sku +
        "  >edit</a>  <a href='#d'  id='" +
        arr[i].sku +
        "d'   >delete</a> </td></tr>";
    }

    successMessage("Product added successfully.");
    clearInput();
    $("#product_list").html(table + "</table>");
  }

  // function to listen edit / delete
  $("#product_list").on("click", "a", function () {
    // console.log(this.id.slice(0, -1));

    if (this.id.includes("d")) {
      console.log("entering delete product");
      deleteProduct(this.id.slice(0, -1));
    } else {
      $("#add_product").hide();
      $("#update_product").show();
      // console.log(this.id)
      setElements(this.id);
    }
  });

  // function to set input fields
  function setElements(id) {
    var index = arrProducts.findIndex((x) => x.sku == id); //finding index of element
    // console.log(arrProducts[index]);
    $("#product_sku").val(arrProducts[index].sku);
    $("#product_name").val(arrProducts[index].name);
    $("#product_price").val(arrProducts[index].price);
    $("#product_quantity").val(arrProducts[index].quantity);
    $("#product_sku").attr("disabled", "disabled");
  }

  // function to update products
  $("#update_product").click(function () {
    var sku = $("#product_sku").val();
    var name = $("#product_name").val();
    var price = $("#product_price").val();
    var quantity = $("#product_quantity").val();
    var index = arrProducts.findIndex((x) => x.sku == sku);
    //   console.log(index, id, pname, price);
    if (checkEmpty(sku, name, price, quantity)) {
      if (checkVals(sku, name, price, quantity)) {
        arrProducts[index].name = name;
        arrProducts[index].price = price;
        arrProducts[index].quantity = quantity;
        display(arrProducts);
        successMessage("Product updated successfully");
        $("#add_product").show();
        $("#update_product").hide();
        $("#product_sku").attr("disabled", false);
        clearInput();
      }
    }
  });
  let did;
  // function to delete elements
  function deleteProduct(id) {
    did = id;

    $("#delete").show();
    $("#btnCancel").click(function () {
      $("#delete").hide();
    });
  }
  $("#btnDelete").click(function () {
    var index = arrProducts.findIndex((x) => x.sku == did);
    arrProducts.splice(index, 1);
    display(arrProducts);
    successMessage("Product id: " + did + " deleted Successfully");
    $("#delete").hide();
  });
  // function checking empty input fields
  function checkEmpty(sku, name, price, quantity) {
    if (sku && name && price && quantity) {
      return true;
    } else {
      $("input").css("border-color", "black");
      $(".success").hide();
      $(".error").show();
      $(".error_message").html("");
      if (!sku) {
        $(".error_message").html("*SKU field is empty");
        $("#product_sku").css("border-color", "red");
      }
      if (!name) {
        $("#product_name").css("border-color", "red");

        $(".error_message").append("</br> *name field is empty");
      }
      if (!price) {
        $("#product_price").css("border-color", "red");
        $(".error_message").append("</br> *price field is empty");
      }
      if (!quantity) {
        $("#product_quantity").css("border-color", "red");
        $(".error_message").append("</br> *quantity field is empty");
      }
      $(".close").click(function () {
        $(".error_message").html("");
        $(".error").hide();
      });
      return false;
    }
  }

  // function validating values
  function checkVals(sku, name, price, quantity) {
    // console.log(!isNaN(sku), !isNaN(price), !isNaN(quantity), isNaN(name));

    if (isNaN(sku) || isNaN(price) || isNaN(quantity) || !isNaN(name)) {
      $("input").css("border-color", "black");
      $(".success").hide();
      $(".error").show();
      $(".error_message").html("");
      if (isNaN(sku)) {
        $("#product_sku").css("border-color", "red");

        $(".error_message").append("*SKU field should be integer");
      }
      if (isNaN(price)) {
        $("#product_price").css("border-color", "red");

        $(".error_message").append("*price field should be integer");
      }
      if (isNaN(quantity)) {
        $("#product_quantity").css("border-color", "red");

        $(".error_message").append("*quantity field should be integer");
      }
      if (!isNaN(name)) {
        $("#product_name").css("border-color", "red");

        $(".error_message").append("*name field should be string");
      }
      $(".close").click(function () {
        $(".error_message").html("");
        $(".error").hide();
      });
      return false;
    } else {
      return true;
    }
  }

  // function to send success notification
  function successMessage(message) {
    $("input").css("border-color", "black");
    $(".success").css("display", "block");
    $(".success_message").html(message);
    $(".error").hide();
    $(".close").click(function () {
      $(".success").hide();
    });
  }

  // function to clear input
  function clearInput() {
    $("#product_sku").val("");
    $("#product_name").val("");
    $("#product_price").val("");
    $("#product_quantity").val("");
  }
});
