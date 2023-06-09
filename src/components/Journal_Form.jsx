import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

// Array with songs
const songs = {
  // C major
  "#ff1d04": {
    links: [
      "https://open.spotify.com/track/57dUBdsYxmnKaW9plDtdIe?si=1ed3414dba2442c6",
      "https://open.spotify.com/track/2sAWdoENO0EK1qeYTJ5Pwe?si=cc5a02bee72a42e3",
      "https://open.spotify.com/track/2ijZZBCOzQeIK4M3SWpHlo?si=7705e3afe2134616",
      "https://open.spotify.com/track/0Lqf0rStsYsRublDUSLllQ?si=966182772ac74b52",
      "https://open.spotify.com/track/5eUhnC7FSrpj3J6IxpoHD0?si=f0f9c8109e384cc1",
      "https://open.spotify.com/track/7D00H0DQyU7iyjX68F6t8E?si=4773d43404f94d6a",
      "https://open.spotify.com/track/1Y6DagA83qId9Gdyy2tk39?si=51698ffb081c4a35",
      "https://open.spotify.com/track/5O6z8nHlN8UespcUT6WFQE?si=53b1e1cad9114df2",
      "https://open.spotify.com/track/3c0NxCkTVApdMMmR786HMu?si=e0bf177c6ac4431b",
      "https://open.spotify.com/track/1TAru0SMZ1FvZQgyGYkE50?si=a96683ab9f8b49b2",
      "https://open.spotify.com/track/1FVZppSFBPMaRdmNg6kYnh?si=604e6a9db6f94f16",
      "https://open.spotify.com/track/0hF2HQi2uDb4vsSISHGoku?si=304973584cf24f3c",
      "https://open.spotify.com/track/1sTbKKwkoR9qK9j8jj5QHg?si=af56f84691964944",
      "https://open.spotify.com/track/0TLJNqn9z0NUuKO6r5vRW6?si=2804f5b9c36742b5",
    ],
  },
  // G major
  "#fb9507": {
    links: [
      "https://open.spotify.com/track/17A3zj6XllYLQJZvRdehFd?si=6f494e16a27d41eb",
      "https://open.spotify.com/track/6tw3vANqKxNKebV6l9PAXB?si=d1e4e2c089644c83",
      "https://open.spotify.com/track/2r5LbETHpLssspVKwJB1py?si=5911996bdd0c48b7",
      "https://open.spotify.com/track/3SRHL8njcO1aHGKy7AF4Pz?si=f02f323519174347",
      "https://open.spotify.com/track/6GkV47sSldBLiNU2cK2Ugx?si=21ab5a2ad18243d9",
      "https://open.spotify.com/track/24I4lm9ih63GJsuZen3385?si=65aac2333546467e",
      "https://open.spotify.com/track/5XNmZTTVL33LPjUWkblOMW?si=1009496f74124db2",
      "https://open.spotify.com/track/6mfzChQftMMOpP6Z67VLeu?si=b8f403595b5247e9",
      "https://open.spotify.com/track/3Xg6nZtQsjamXL7vDrdNMl?si=fd8280194e184cb9",
      "https://open.spotify.com/track/7z2GxaOoCDyQJFuUcMjmzn?si=dd6ecba83d964d23",
      "https://open.spotify.com/track/1yIpwGYy0URGsBTTSpe7r9?si=3eb3e9f97f8b4ada",
      "https://open.spotify.com/track/0GWUJCqanwtBOPGB0wNKYZ?si=ae111c1e367b4b4e",
    ],
  },
  // D major
  "#fbff00": {
    links: [
      "https://open.spotify.com/track/2Xh2kk9wNrA8bSk1PXIG6q?si=d4797d845a114bc9",
      "https://open.spotify.com/track/1Ci7I8urwKHxkscZfg8T7l?si=171b2d005afd4303",
      "https://open.spotify.com/track/7augro0nLXCJRJnNonxK5C?si=c554f8ea2d0d42c8",
      "https://open.spotify.com/track/7xg8hM0CQR0nnSKqIUjnOZ?si=a3a22b0803494cab",
      "https://open.spotify.com/track/2nSFJWthPNzDgQtxwXy4Sb?si=f2bfd3f3fe5347a1",
      "https://open.spotify.com/track/4ySqdQH0bhSzuGbBjeJrQm?si=cc871db227de444e",
      "https://open.spotify.com/track/6WKXJwgtSdkDj3fRga7VWy?si=b99b59e886694576",
      "https://open.spotify.com/track/69Lc97mGYtibBIRZhDR7Zd?si=d2a6314d581546d7",
      "https://open.spotify.com/track/71LygqTJS5GnsHF5AWi6P4?si=1a53b3a8c931426b",
      "https://open.spotify.com/track/3X0wDfJIK7eYlPEvbfFSpJ?si=8c49641feac74a1d",
      "https://open.spotify.com/track/2Om6056obklMVh7a0gnKkN?si=583248559511489b",
    ],
  },

  // A major
  "#4dd34d": {
    links: [
      "https://open.spotify.com/track/2Ly8U9DQ2IdMz45H52uKDO?si=5888aeb4e6404385",
      "https://open.spotify.com/track/5ilQ7W9sgGew5qrXSyqXBC?si=e08936f176754845",
      "https://open.spotify.com/track/5MJWrBYRvGdoDYHNP70YaY?si=20362da5cc474ab7",
      "https://open.spotify.com/track/4IVLObZtU3RtG7rTbNaf9z?si=83dd959e9ad34af0",
      "https://open.spotify.com/track/6UafJAOayzS7VKxlEI3OGk?si=7276ce7fe7cb4eb6",
      "https://open.spotify.com/track/0uyRYrIrhZMMYcuPe2hbM6?si=9f750590ff6848e5",
      "https://open.spotify.com/track/2lJWbOdU6gwvmuqXzPjyVv?si=01bd487b90744701",
      "https://open.spotify.com/track/2vN3Uvb2E6mDuByTLlu8HL?si=f552ba61332a4e91",
      "https://open.spotify.com/track/7vKLGaWvYZEs0foJJPbzL9?si=e3c65a6aa1b34169",
      "https://open.spotify.com/track/3UBy8edCRJH7OHlkJ3K91H?si=4ba3854f7fd84a80",
      "https://open.spotify.com/track/6J2MZ3QyCTPqh3X0NkRJtz?si=5345d81be9b54005",
      "https://open.spotify.com/track/3oCL1wjZVetGwZcGAdnXpz?si=f8938eb78d8f48b7",
    ],
  },

  // E major
  "#cef2f4": {
    links: [
      "https://open.spotify.com/track/3gGpCxvW1tUhoD3Ap4PH7Q?si=382fbca9d3c840f7",
      "https://open.spotify.com/track/2hRcjNaWacY1qXDQt8y4eQ?si=dc68c1501efa41e2",
      "https://open.spotify.com/track/5kH5YCZsQt0CgygFcmhfQF?si=2365ac41765e4ecf",
      "https://open.spotify.com/track/5WYAjlqPvLXiVZcVZvHxCX?si=1f4c85ba670d4cef",
      "https://open.spotify.com/track/4VTusHUaOqGymHkRpSvfo3?si=df3ddf9b08494cb2",
      "https://open.spotify.com/track/3sAYxq1986j3ydqLv6jwUJ?si=dee7a4f681214cd5",
      "https://open.spotify.com/track/4Uk5HBXrc3bo5q0d2uqnhk?si=4ad6e4b1c4844f13",
      "https://open.spotify.com/track/6Jg8CNCIN4iVu6jgpdz1Cq?si=b986c8cc42e3478b",
      "https://open.spotify.com/track/3wrC8wQaOqkAcrJniDyt7Q?si=cb7e656f90f5494e",
    ],
  },

  // B major
  "#86d3ff": {
    links: [
      "https://open.spotify.com/track/4mSyTgZP57llH60Wa3MGgr?si=cb3beefedea14fc7",
      "https://open.spotify.com/track/0pA5lxXSQ61cQ97L2XsSoq?si=75056953c7434671",
      "https://open.spotify.com/track/1hD4MadHO26WS5QyBSHsgg?si=8ff0ebeb52e74140",
      "https://open.spotify.com/track/4UD5msFwrQzRRSwd9JOhlo?si=87947736fcaf4386",
      "https://open.spotify.com/track/6ULmGjwWJsllZPw1Jkftce?si=ea0dd12dff7b477b",
      "https://open.spotify.com/track/3f2MpWcbZhhgK9p9phyc3f?si=c4d04fd755514bb1",
    ],
  },

  // F major
  "#b73939": {
    links: [
      "https://open.spotify.com/track/1RQzYNm3ZneCj83YZrloPo?si=c0abd0a025444b92",
      "https://open.spotify.com/track/6yyNb6SdsM7PqNjAYMs2wI?si=888ae80e15784baf",
      "https://open.spotify.com/track/4CpIuY23bjunwaEZsRsDCn?si=5668374153a24695",
      "https://open.spotify.com/track/3cS7Xkn5snxilAyX8HtJkw?si=aab6d233c70447ec",
      "https://open.spotify.com/track/6s8MErajfVFRqDWbAFxH9h?si=9fd6cd6d5b8e412f",
      "https://open.spotify.com/track/5UbN3fe9OB1p5KwjgUAHD4?si=4798e95da5db4173",
      "https://open.spotify.com/track/3KtqXXPUS14B8FmNKSlawO?si=8dc5704aaeab4274",
      "https://open.spotify.com/track/4H4kkttXLOD1ePMTTrZ5SX?si=8ce11a7826964a78",
      "https://open.spotify.com/track/06P43EFstY4UpGiaaibu7P?si=bc481ff31a0d4ecd",
      "https://open.spotify.com/track/2DhhfVM3Y985oKotWeUnFQ?si=fd070e2f155d4319",
      "https://open.spotify.com/track/1vRHugondOkbauIAi7outr?si=88fa2ed000ef47f2",
      "https://open.spotify.com/track/6cEmZmkoooz48sBTBpKo4R?si=41577580a8ee4e58",
      "https://open.spotify.com/track/6RBeBgl7mZFjo0HSZLHGBL?si=9fcedfd533074998",
    ],
  },

  // Bb major/ B flat major
  "#b48295": {
    links: [
      "https://open.spotify.com/track/2N0fucXCh5ByBzyg8eiY64?si=7136284947354614",
      "https://open.spotify.com/track/30otqouBKURZ7pS2uQqpJv?si=c0b43570f7ae4c3a",
      "https://open.spotify.com/track/3clwKlneIpCI6OiiOcUbym?si=f9a079abdfd84be0",
      "https://open.spotify.com/track/2ALgJnlcf9JkjX56s0LjSA?si=0867028621ea4598",
      "https://open.spotify.com/track/52jCDiOF4zaC2pNDYqtYH0?si=e140721c041c40a1",
      "https://open.spotify.com/track/6r46FfGHiU34k66vcTPAA3?si=7ffdbc1c02f14b6c",
      "https://open.spotify.com/track/1Bc2J5ilCJrZlJHWZm5viI?si=994902e2ac1c4855",
      "https://open.spotify.com/track/2tBCpUfnYUFFATgO2I27wM?si=31735ef5c3e94cd3",
      "https://open.spotify.com/track/2jnnGWm1iJDZMup2JGoJek?si=8a816b270b854171",
      "https://open.spotify.com/track/3tEopPG33uo1iCYYBaEwin?si=c6ab110b2adb4c8d",
      "https://open.spotify.com/track/4biInRem6c1ZoyoLHfG6aE?si=7192565f3b464221",
      "https://open.spotify.com/track/1DOr4Tp2McYe3ESjXuVWi8?si=40f0437fe15146d0",
    ],
  },

  // Eb major / E flat major
  "#df519a": {
    links: [
      "https://open.spotify.com/track/24nTZUgqU1P7fn074Pm3xZ?si=0c1d51b1350048a7",
      "https://open.spotify.com/track/3iZKktFUn1fCFZpFxx08zB?si=1a86d8fdb1244b21",
      "https://open.spotify.com/track/1yj2Nen7t6IwuVAhNW9WVr?si=eac39fcff4654a79",
      "https://open.spotify.com/track/02CZ69XPcuBINeBXc7N9sG?si=94c9bf8b679440d1",
      "https://open.spotify.com/track/7KTZ73taz6yEoElsz8krdA?si=f58950225b5f4aef",
      "https://open.spotify.com/track/5yzujBWo2YHklgIxtDRFYu?si=8c826586a4f94289",
      "https://open.spotify.com/track/5eWolmRIyUOl6cdOtYv9T3?si=6842f4ccd4434700",
      "https://open.spotify.com/track/6GIngQZ7188GAkIjtX03oz?si=411e94d068ca495c",
      "https://open.spotify.com/track/3hzwue7McAwWO7JxzY37xP?si=4cd6122777704b30",
    ],
  },

  // Ab major / A flat major
  "#ca90f0": {
    links: [
      "https://open.spotify.com/track/0N3yY7LV4qQTGfbsEbEEnN?si=e23492db3c5c42bc",
      "https://open.spotify.com/track/2EfIEzfjL2CMlyn6cvYlOg?si=639c0320ff2a4e6b",
      "https://open.spotify.com/track/5VrrS9llPsTkdK91UaXGWB?si=acb8ea234ed04888",
      "https://open.spotify.com/track/718pVGAjR9TIeuyaxFyJmU?si=e3935f367c334dca",
      "https://open.spotify.com/track/40D9idPbLURZo4Bkd9PAcc?si=6d5261f44c074a8c",
      "https://open.spotify.com/track/4fCdfmIrRyRTKadwSJTJCZ?si=51acd473de554630",
      "https://open.spotify.com/track/1Q6l44RRzNOJX1xccg7HdH?si=28a10640a1bb4605",
      "https://open.spotify.com/track/6ZPRrSgpc4SyzGNtlAcvbz?si=3e15892da87048a9",
      "https://open.spotify.com/track/3POW7QUFSmUFUkr7AlRT2f?si=c4a04d09e1a04f9a",
      "https://open.spotify.com/track/5I33EBVJYQV3LOw4asmiTj?si=bc9b5c38ca124048",
      "https://open.spotify.com/track/5E5f4LXNMN5JUkG9XrTkk6?si=97706f91e308438a",
      "https://open.spotify.com/track/03VZwfmPvLJtTaAw2zN4Q9?si=18337e3af4044247",
      "https://open.spotify.com/track/1CbNtHjdST5u0SWtheHPX8?si=fd21de3a5fde468c",
      "https://open.spotify.com/track/6VHNYW6uizpQHrlk1PzoF3?si=e8002486bc0044dd",
    ],
  },

  // Db major/ D flat major
  "#964df5": {
    links: [
      "https://open.spotify.com/track/2MMm5gCJ7z9HgYGcDcuwdb?si=5f975d539a7d474d",
      "https://open.spotify.com/track/0IOLO5qilos6TTQKqf2lik?si=111fd2db4ea24b45",
      "https://open.spotify.com/track/4D9aHHe11tQZv4FGufFbGn?si=4c2550e2da904ac4",
      "https://open.spotify.com/track/66QFC1l8Oe1bKSLdZYwr9B?si=025c939d8cf44a66",
      "https://open.spotify.com/track/6vBZAAMRS9xQA1qdplRBLr?si=f97bd911732b4f62",
    ],
  },
  //Gb major
  "#83a6f2": {
    links: [
      "https://open.spotify.com/track/2oLI4DV6JjAmNysSG7P5pP?si=518372544e294fec",
      "https://open.spotify.com/track/4tviahlPeaGlkY5IMgapjn?si=430e61acbf3b47d9",
      "https://open.spotify.com/track/67zuacG5a8tecPHt7RYY44?si=2c142193db4148ea",
      "https://open.spotify.com/track/4o3jF0wrXx1gqauxuX8CHC?si=795b16742b6d4ebe",
      "https://open.spotify.com/track/4UxJfMf0pMEVQ9xo5a0iiY?si=a743974590814e79",
      "https://open.spotify.com/track/1Nmu6h48zgRV6QaogVSBvX?si=bbd528783d0b4368",
      "https://open.spotify.com/track/5nyjJE5icW9rkqFGTZVhYR?si=dee67045d13143d1",
      "https://open.spotify.com/track/2QvLi92zHWhErc0vMo7qFg?si=c0e248027ad14a6c",
      "https://open.spotify.com/track/6QwZXacklV13SY3x5yEkv6?si=0f6c4fb649f44e3d",
      "https://open.spotify.com/track/3SIygtDHnh9MQwKBXHNRrH?si=d89bca3cc67c4558",
      "https://open.spotify.com/track/4IKD5EeId9qHSnxlStgbbW?si=2825a137bcfd4efd",
      "https://open.spotify.com/track/6gtuJR8w1VXlIPWWd3HwWq?si=8b69e159d88e499a",
    ],
  },
};

export default function JournalForm({ color }) {
  // Getting random song
  const mySong =
    songs[color].links[Math.floor(Math.random() * songs[color].links.length)];
  console.log(mySong);

  //navigation
  const navigation = useNavigate();

  // handleTransferToHistory()
  function handleTransferToHistory() {
    navigation("/journal_entries");
  }

  // refreshing page
  function handleTransferToTheBeginning() {
    window.location.reload(false);
  }

  //getSession()
  let alreadyMounted = false;

  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!alreadyMounted) {
      getSession();
    }

    alreadyMounted = true;
  }, []);

  const getSession = async () => {
    //supabase:
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      navigation("/signin");
      return;
    }

    setSession(data);
  };

  //handleSaveText() - sending text entries to supabase
  const handleSaveText = async (e) => {
    e.preventDefault();

    const { text } = e.target.elements;

    // blocking the addition of empty entries to the supabase
    if (!text.value) {
      return;
    }

    // currentDate
    const currentDate = new Date();
    const visiblecurrentDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    console.log(visiblecurrentDate);

    // supabase:
    const { data, error } = await supabase
      .from("Gratitude Journal Entries")
      .insert([
        {
          entry: text.value,
          author: session.session.user.email,
          current_date: visiblecurrentDate,
          random_song: mySong,
          selected_color: color,
        },
      ])
      .select("*");

    console.log(error);
    console.log(data);

    handleTransferToHistory();
  };

  // textarea text Color
  const [textColor, setTextColor] = useState(null);

  useEffect(() => {
    if (color == "#ff1d04") {
      setTextColor("white");
    } else if (color == "#964df5") {
      setTextColor("white");
    } else if (color == "#b48295") {
      setTextColor("white");
    } else if (color == "#b73939") {
      setTextColor("white");
    } else if (color == "#df519a") {
      setTextColor("white");
    } else {
      setTextColor("black");
    }
    alreadyMounted = true;
  }, []);

  //backgroundColor

  return (
    <>
      <div className="Journal_Form">
        <h1 className="journal_form_title_question">
          {" "}
          What are you grateful for today?{" "}
        </h1>

        <form onSubmit={handleSaveText}>
          <div className="Journal_Form_Div">
            <div className="Journal_Form_textarea">
              <textarea
                className="form_textarea"
                id="text"
                placeholder="Write here..."
                style={{
                  background: color,
                  color: textColor,
                }}
              />
            </div>
            <div className="Add_entry_button">
              <button>Add entry </button>
            </div>
          </div>
          <br />
          <br />
        </form>
        <br />
        <div className="button_choose_color">
          <button onClick={handleTransferToTheBeginning}>
            {" "}
            Choose another color{" "}
          </button>
        </div>
      </div>
    </>
  );
}
