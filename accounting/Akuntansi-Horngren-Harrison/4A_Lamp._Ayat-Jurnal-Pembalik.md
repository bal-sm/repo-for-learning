# Ayat Jurnal Pembalik

- Opsional
- Ayat jurnal khusus yang memudahkan pekerjaan akuntansi untuk transaksi pada periode selanjutnya.
- Kebalikan dari ayat jurnal penyesuaian tertentu pada akhir periode sebelumnya.
  - Akibatnya akan tampak saldo negatif (kredit) pada akun beban yang bersangkutan.
    - Sehingga saat pembayaran, akun beban tersebut kembali pada saldo nol dan ditambahkan sesuai berapa besar kas/equivalents (lawan akun) yang terpakai.

## Contohnya

### Akuntansi untuk Beban Akrual

Perusahaan Cookie Lapp.

Ringkasan Neraca yang menjadi perhatian topik ini.

Beban Gaji pada 30 April 2008, sebelum penyesuaian.
|                                          |     |
| ---------------------------------------: | --: |
| Dibayar selama April, Cash Payment - 900 |     |

Ayat Jurnal Penyesuaian pada 30 April 2008.
| 1        | 2              | 3   | 4   |
| :------- | :------------- | :-- | :-- |
| 30 April | Beban Gaji     | 900 |     |
|          | ____Utang Gaji |     | 900 |

Beban Gaji pada 30 April 2008, setelah penyesuaian tersebut.
|                       |     |
| --------------------: | --: |
|    30 Apr. Adj. - 900 |     |
|    30 Apr. Adj. - 900 |     |
| 30 Apr. Saldo - 1.800 |     |

Utang Gaji pada 30 April 2008, setelah penyesuaian tersebut.
| 1   | 2                    |
| :-- | :------------------- |
|     | 30 April Adj. - 900  |
|     | 30 April Saldo - 900 |

Setelah itu:
- Laporan laba rugi bulan April melaporkan beban gaji sebesar $1.800.
- Neraca per 30 April melaporkan utang gaji sebesar $900.

Ayat Jurnal Penutup
| 1        | 2                  | 3     | 4     |
| :------- | :----------------- | :---- | :---- |
| 30 April | Ikhtisar Laba Rugi | 1.800 |       |
|          | ____Beban Gaji     |       | 1.800 |

Beban Gaji pada 30 April 2008, setelah penyesuaian tersebut.
|                       |                         |
| --------------------: | ----------------------: |
|    30 Apr. Adj. - 900 |                         |
|    30 Apr. Adj. - 900 |                         |
| 30 Apr. Saldo - 1.800 | 30 Apr. Closing - 1.800 |
|                       |               Saldo Nol |

Mine:
> Langsung skip aja ke [sini](#membuat-ayat-jurnal-pembalik)

### Akuntansi Tanpa Ayat Jurnal Pembalik

Jurnal pembayaran gaji sebesar $1.000.
| 1     | 2          | 3   | 4    |
| :---- | :--------- | :-- | :--- |
| 5 Mei | Utang Gaji | 900 |      |
|       | Beban Gaji | 100 |      |
|       | ____Kas    |     | 1000 |

Keterangan (bahasa sendiri):
- Akuntan akan kesulitan membuat jurnal ini, soalnya utang gaji harus merujuk ke jurnal penyesuaian periode sebelumnya.
- Maka dibutuhkan jurnal pembalik.

### Membuat Ayat Jurnal Pembalik

Ayat Jurnal Pembalik berdasarkan kebalikan Ayat Jurnal Penyesuaian tea.
| 1     | 2              | 3   | 4   |
| :---- | :------------- | :-- | :-- |
| 1 Mei | Utang Gaji     | 900 |     |
|       | ____Beban Gaji |     | 900 |

Utang Gaji
| 1                       | 2                    |
| :---------------------- | :------------------- |
| **1 Mei Reverse - 900** | 30 April Saldo - 900 |
|                         | Saldo Nol            |

Beban Gaji
| 1                      | 2                        |
| :--------------------- | :----------------------- |
| 30 April Saldo - 1.800 | 30 April Closing - 1.800 |
|                        | Saldo Nol                |
|                        | **1 Mei Reverse - 900**  |

Jurnal pembayaran gaji sebesar $1.000.
| 1   | 2          | 3     | 4     |
| :-- | :--------- | :---- | :---- |
|     | Beban Gaji | 1.000 |       |
|     | ____Kas    |       | 1.000 |

Beban Gaji
| 1                          | 2                   |
| :------------------------- | :------------------ |
| 5 Mei Cash Payment - 1.000 | 1 Mei Reverse - 900 |
| 5 Mei Saldo - 100          |                     |

Mine:
> Tuh kan sama. Pokoknya Utang Gaji kebayar juga semua.
