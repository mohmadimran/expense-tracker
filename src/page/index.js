import { Box, Typography, Paper, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Card from "../component/card";
import AppModal from "../component/modal";
import BalanceModal from "../component/addBalance";
import FormSection from "../component/form";
import TransactionList from "../component/transactionList";
import PiaChartComponent from "../component/pieChart";
import BarChartComponent from "../component/barChart";

export default function HomePage() {
  const [isBalance, setIsBalance] = useState(0);
  const [isExpense, setIsExpense] = useState(0);
  const [isExpenseList, setIsExpenseList] = useState([]);

  const [isOpenForBalance, setIsOpenForBalance] = useState(false);
  const [isOpenForExpense, setIsOpenForExpense] = useState(false);

  const [forCategorySpend, setForCategorySpend] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [forCategoryCount, setForCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    const balance = localStorage.getItem("balance");
    if (balance) {
      setIsBalance(Number(balance));
    } else {
      setIsBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const expenseValue = JSON.parse(localStorage.getItem("expenses"));
    setIsExpenseList(expenseValue || []);
    setIsMount(true);
  }, []);

  useEffect(() => {
    // update transaction list
    if (isExpenseList.length > 0 || isMount) {
      localStorage.setItem("expenses", JSON.stringify(isExpenseList));
    }
    // update expense amount
    if (isExpenseList.length > 0) {
      setIsExpense(
        isExpenseList.reduce(
          (accumulator, currentVal) => accumulator + Number(currentVal.price),
          0
        )
      );
    } else {
      setIsExpense(0);
    }
    //  pi chart variable
    let foodSpend = 0,
      entertainmentSpend = 0,
      travelSpend = 0;

    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    isExpenseList.forEach((item) => {
      if (item.category === "food") {
        foodSpend += Number(item.price);
        foodCount++;
      } else if (item.category === "entertainment") {
        entertainmentSpend += Number(item.price);
        entertainmentCount++;
      } else if (item.category === "travel") {
        travelSpend += Number(item.price);
        travelCount++;
      }
    });

    setForCategorySpend({
      food: foodSpend,
      entertainment: entertainmentSpend,
      travel: travelSpend,
    });
    setForCategoryCount({
      food: foodCount,
      entertainment: entertainmentCount,
      travel: travelCount,
    });
  }, [isExpenseList]);

  useEffect(() => {
    if (isMount) {
      localStorage.setItem("balance", isBalance);
    }
  }, [isBalance]);

  return (
    <Container>
      <Typography
        component="h1"
        marginY={{ md: "30px", xs: "20px" }}
        sx={{
          width: "90%",
          marginX: "auto",
          fontSize: { md: "25px", xs: "22px" },
          fontWeight: 700,
          color: "var(--text-color)",
        }}
        textAlign={{ md: "left", xs: "center" }}
      >
        Expense Tracker
      </Typography>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "10px",
          backgroundColor: "var(--third-card-container-bg-color)",
          width: "90%",
          margin: "0px auto",
          padding: "20px",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              isWallet
              heading="Wallet Balance"
              btnText="+ Add Income"
              openModal={setIsOpenForBalance}
              value={isBalance}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              isWallet={false}
              heading="Expenses"
              btnText="+ Add Expense"
              openModal={setIsOpenForExpense}
              value={isExpense}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ width: "100%", height: "300px", position: "relative" }}>
              <PiaChartComponent
                data={[
                  { name: "Food", value: forCategorySpend.food || 0 },
                  {
                    name: "Entertainment",
                    value: forCategorySpend.entertainment || 0,
                  },
                  { name: "Travel", value: forCategorySpend.travel || 0 },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid
        container
        spacing={2}
        sx={{
          width: "90%",
          marginX: "auto",
          marginY: { md: "20px", xs: "10px" },
        }}
      >
        <Grid size={{ md: 8, xs: 12 }}>
          <Typography
            component="h2"
            textAlign={{ md: "left", xs: "center" }}
            sx={{
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--text-color)",
              fontSize: { md: "25px", xs: "22px" },
            }}
          >
            Recent Transactions
          </Typography>
          <TransactionList
            updateBalance={isBalance}
            setUpdateBalance={setIsBalance}
            expenseList={isExpenseList}
            setExpenseList={setIsExpenseList}
          />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <Typography
            component="h2"
            sx={{
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--text-color)",
              fontSize: { md: "25px", xs: "22px" },
            }}
            align="center"
            textAlign={{ md: "left" }}
          >
            Top Expenses
          </Typography>

          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "#ffffff",
            }}
          >
            <BarChartComponent
              data={[
                {
                  name: "Entertainment",
                  value: forCategoryCount.entertainment,
                },
                { name: "Food", value: forCategoryCount.food },
                { name: "Travel", value: forCategoryCount.travel },
              ]}
            />
          </Paper>
        </Grid>
      </Grid>
      <AppModal isOpen={isOpenForBalance} onClose={setIsOpenForBalance}>
        <BalanceModal
          closeModal={setIsOpenForBalance}
          setIsBalance={setIsBalance}
        />
      </AppModal>
      <AppModal isOpen={isOpenForExpense} onClose={setIsOpenForExpense}>
        <FormSection
          CloseExpenseModal={setIsOpenForExpense}
          setWalletBalance={setIsBalance}
          walletBalance={isBalance}
          setExpenseList={setIsExpenseList}
          expenseList={isExpenseList}
        />
      </AppModal>
    </Container>
  );
}
