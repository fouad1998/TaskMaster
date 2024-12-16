import ErrorLoading from "../common/ErrorLoading";
import Stars from "./Stars";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { useAuth } from "../auth/AuthProvider";
import { User } from "../auth/AuthProvider/types";
import { fetchWrap } from "../common/fetch";
import { routes } from "../common/routes";
import { getOrdinalPosition } from "./utils";

function LeaderBoard() {
  const { user } = useAuth();
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>(["users"], function () {
    return fetchWrap("user/list/");
  });

  return (
    <Stack py={6} gap={5} sx={{ maxWidth: 550, width: "100%", mx: "auto" }}>
      <Stack gap={2}>
        <Stars />
        <Typography variant="h3" align="center" fontWeight={600}>
          SILVER LEAGUE
        </Typography>

        {isError ? (
          <ErrorLoading refetch={() => {}} />
        ) : isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <List component="nav">
            {users
              ?.sort((a, b) => b.xp - a.xp)
              .map((usr, index) => (
                <ListItemButton
                  key={usr.id}
                  selected={usr.id === user?.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr",
                  }}
                >
                  <ListItemIcon>{getOrdinalPosition(index + 1)}</ListItemIcon>
                  <ListItemText>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 3,
                      }}
                    >
                      <span>
                        {usr.first_name} {usr.last_name.toUpperCase()}
                      </span>
                      <Typography
                        variant="body2"
                        color="GrayText"
                        fontWeight={500}
                      >
                        {usr.level} Level — {usr.xp} XP
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListItemButton>
              ))}
          </List>
        )}
      </Stack>

      <Button
        LinkComponent={Link}
        href={routes.tasks}
        variant="outlined"
        color="secondary"
        sx={{ mx: "auto", px: 6 }}
      >
        Explore Tasks
      </Button>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <Avatar
          sx={{ width: 70, height: 70 }}
          src="https://mui.com/static/images/avatar/1.jpg"
        />
        <Stack py={1}>
          <Typography fontSize="1.35rem" fontWeight="bold">
            {user?.first_name} {user?.last_name.toUpperCase()}
          </Typography>

          <Typography color="warning" fontWeight={600} display="flex" gap={0.5}>
            <span>{user?.level} Level</span>—<span>{user?.xp} XP</span>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LeaderBoard;
