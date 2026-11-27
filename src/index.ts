import * as readline from "readline-sync";

// deklarasi nama aplikasi
const APP_NAME: string = "Fast Cashier";

// deklarasi let untuk nilai yang akan berubah selama eksekusi program
let isRunning: boolean = true;
let subTotal: number = 0;
let totalItemsOrdered: number = 0;

// data placeholder
const menuItems = [
  { id: 1, name: "Air Mineral", price: 3000, quantity: 50 },
  { id: 2, name: "Teh Pucuk", price: 3000, quantity: 50 },
  { id: 3, name: "Fruit Tea", price: 5000, quantity: 50 },
  { id: 4, name: "Sosis So Nice", price: 2000, quantity: 50 },
];

// logo
const rawLogo = `
                      #########
                     #.+########
                     #--#++--..#
                         ###
               ########+-....... .-#
               #..# ++++++.--.++++.#             ++++++++   ++++    +++++++ --------
################..# -++++.---...++.+#            +++       ++-++   +++        ---
  ##............#.##.++++.----.++++.#            ++++++   ++  ++    ++++++    ---
    ##...........#.#.+++.++.-.+++++.##          +++     +++++++++       +++   --
       #######.....#.+++++.-........##          +++    +++     ++ ++++++++   ---
   ##### ######....## .###-.##.. ..-####
                #+..##..-+..###-......#.##       #####    ###    #####  ##   ## ### ###### ######
                ......##.....--#.####...#.##   ###       ####   ##     ###  ### ##  ##     ##   ##
        # ########+.....##.# ..-#.##....#..#   ##       ## ###   ####  #######  ## ######  ######
               ###..#+....#####.-.##.......#   ###  #  ####### ##  ### ##   ## ### ##     ### ##
                   ###.....#....-# #.....###     ###  ##    ### ####  ##   ### ##  ###### ##   ##
                       ###.#..####... ###+...#
                           #      #- #####
`;

// membuat fungsi
function main(): void {
  console.log(rawLogo);

  // Menampilkan sambutan aplikasi ke terminal
  console.log("========================================");
  console.log(`   Selamat Datang di ${APP_NAME}!   `);
  console.log("========================================\n");

  // menampilkan semua data menu yang ada di array menuItems
  console.log("--- DAFTAR MENU ---");
  // validasi jika menu kosong
  if (menuItems.length > 0) {
    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      console.log(`${i + 1}. ${item?.name}      - Rp ${item?.price}`);
    }
  } else {
    console.log("Menu Sedang Kosong");
  }
  console.log("------------------------\n");

  // loop untuk pemesanan
  while (isRunning) {
    // meminta input nomor menu dari user
    const menuChoiceStr: string = readline.question(
      `Masukkan nomor menu yang ingin dibeli (1-${menuItems.length}): `
    );
    const menuChoice: number = Number(menuChoiceStr);

    // validasi input apakah valid sesuai menu
    if (
      !Number.isInteger(menuChoice) ||
      menuChoice < 1 ||
      menuChoice > menuItems.length
    ) {
      console.log(
        `Menu tidak valid! Silakan pilih nomor 1 sampai ${menuItems.length}.\n`
      );
      continue;
    }

    // menyimpan item yg di pilih
    const selectedItem = menuItems[menuChoice - 1];

    if (!selectedItem) {
      console.log(
        `Menu tidak valid! Silakan pilih nomor 1 sampai ${menuItems.length}.\n`
      );
      continue;
    }

    // meminta input jumlah item
    const quantityStr: string = readline.question(
      "Masukkan jumlah yang ingin dibeli: "
    );
    const quantity: number = Number(quantityStr);

    // validasi angka bulat
    if (!Number.isInteger(quantity) || quantity <= 0) {
      console.log("Jumlah tidak valid! Masukkan angka bulat lebih dari 0.\n");
      continue;
    }

    // validasi jika stok toko mencukupi
    if (!Number.isInteger(quantity) || quantity > selectedItem.quantity) {
      console.log("Jumlah melebihi stok toko");
      continue;
    }

    // menyimpan total price item 
    const itemTotal: number = selectedItem.price * quantity;
    
    // mengurangi quantity dengan jumlah item yg dibeli
    selectedItem.quantity -= quantity;

    // menyimpan total keselurahan pembelanjaan
    subTotal += itemTotal;
    totalItemsOrdered += quantity;

    // menampilkan informasi pembelanjaan
    console.log(
      `Berhasil menambahkan ${quantity}x ${selectedItem.name} ke keranjang. (Subtotal sementara: Rp ${subTotal})\n`
    );

    // menanyakan apakah ingin membeli lagi, jika iya mengulang ke atas
    const buyAgain: boolean = Boolean(
      readline.keyInYN("Apakah anda ingin membeli menu lain? ")
    );

    // jika tidak, looping selesai
    if (!buyAgain) {
      isRunning = false;
    }
  }

  console.log("\n========================================");
  console.log("           RINGKASAN PESANAN            ");
  console.log("========================================");
  console.log(`Total Item : ${totalItemsOrdered}`);
  console.log(`Total Bayar: Rp ${subTotal}`);
  console.log("Terima kasih telah berbelanja!");
}

main();