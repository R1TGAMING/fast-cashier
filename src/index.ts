import * as readline from "readline-sync";

// deklarasi nama aplikasi
const APP_NAME: string = "Fast Cashier";

// deklarasi let untuk nilai yang akan berubah selama eksekusi program
let isRunning: boolean = true;
let subTotal: number = 0;
let totalJumlahItem: number = 0;

// data menu statis
const itemMenu = [
  { id: 1, name: "Air Mineral", price: 3000, jumlah: 50 },
  { id: 2, name: "Teh Pucuk", price: 3000, jumlah: 50 },
  { id: 3, name: "Fruit Tea", price: 5000, jumlah: 50 },
  { id: 4, name: "Sosis So Nice", price: 2000, jumlah: 50 },
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

// menampilkan sambutan aplikasi ke terminal
function tampilkanBanner(): void {
  console.log(rawLogo);
  console.log("========================================");
  console.log(`   Selamat Datang di ${APP_NAME}!   `);
  console.log("========================================\n");
}

// menampilkan semua data menu yang ada di array itemMenu
function tampilkanMenu(): void {
  console.log("--- DAFTAR MENU ---");
  // validasi jika menu kosong
  if (itemMenu.length > 0) {
    for (let i = 0; i < itemMenu.length; i++) {
      const item = itemMenu[i];
      console.log(
        `${i + 1}. ${item?.name}      - Rp ${item?.price}         - QTY: ${item?.jumlah}`,
      );
    }
  } else {
    console.log("Menu Sedang Kosong");
  }
  console.log("------------------------\n");
}

// meminta dan memvalidasi pilihan menu dari user
function ambilPilihanMenu() {
  // meminta input nomor menu dari user
  const pilihanMenuStr: string = readline.question(
    `Masukkan nomor menu yang ingin dibeli (1-${itemMenu.length}): `,
  );
  const pilihanMenu: number = Number(pilihanMenuStr);

  // validasi input apakah valid sesuai menu
  if (
    !Number.isInteger(pilihanMenu) ||
    pilihanMenu < 1 ||
    pilihanMenu > itemMenu.length
  ) {
    console.log(
      `Menu tidak valid! Silakan pilih nomor 1 sampai ${itemMenu.length}.\n`,
    );
    return null;
  }

  // menyimpan item yg di pilih di keranjang
  const keranjang = itemMenu[pilihanMenu - 1];

  if (!keranjang) {
    console.log(
      `Menu tidak valid! Silakan pilih nomor 1 sampai ${itemMenu.length}.\n`,
    );
    return null;
  }

  return keranjang;
}

// meminta dan memvalidasi jumlah item terhadap stok toko
function ambilJumlah(keranjang: any): number | null {
  // meminta input jumlah item
  const jumlahStr: string = readline.question(
    "Masukkan jumlah yang ingin dibeli: ",
  );
  const jumlah: number = Number(jumlahStr);

  // validasi angka bulat
  if (!Number.isInteger(jumlah) || jumlah <= 0) {
    console.log("Jumlah tidak valid! Masukkan angka bulat lebih dari 0.\n");
    return null;
  }

  // validasi jika stok toko mencukupi
  if (jumlah > keranjang.jumlah) {
    console.log("Jumlah melebihi stok toko");
    return null;
  }

  return jumlah;
}

// memproses pesanan item, memperbarui stok, dan menambahkan ke total belanja
function prosesItemBelanja(keranjang: any, jumlah: number): void {
  // menyimpan total price item
  const itemTotal: number = keranjang.price * jumlah;

  // mengurangi jumlah dengan jumlah item yg dibeli
  keranjang.jumlah -= jumlah;

  // menyimpan total keselurahan pembelanjaan
  subTotal += itemTotal;
  totalJumlahItem += jumlah;

  // menampilkan informasi pembelanjaan
  console.log(
    `Berhasil menambahkan ${jumlah}x ${keranjang.name} ke keranjang. (Subtotal sementara: Rp ${subTotal})\n`,
  );
}

// menampilkan ringkasan akhir pesanan
function showOrderSummary(): void {
  console.log("\n========================================");
  console.log("           RINGKASAN PESANAN            ");
  console.log("========================================");
  console.log(`Total Item : ${totalJumlahItem}`);
  console.log(`Total Bayar: Rp ${subTotal}`);
  console.log("Terima kasih telah berbelanja!");
}

// membuat fungsi
function main(): void {
  tampilkanBanner();
  tampilkanMenu();

  // loop untuk pemesanan
  while (isRunning) {
    const keranjang = ambilPilihanMenu();
    if (!keranjang) {
      continue;
    }

    const jumlah = ambilJumlah(keranjang);
    if (jumlah === null) {
      continue;
    }

    prosesItemBelanja(keranjang, jumlah);

    // menanyakan apakah ingin membeli lagi, jika iya mengulang ke atas
    const beliLagi: boolean = Boolean(
      readline.keyInYN("Apakah anda ingin membeli menu lain? "),
    );

    // jika tidak, looping selesai
    if (!beliLagi) {
      isRunning = false;
    }
  }

  showOrderSummary();
}

main();
