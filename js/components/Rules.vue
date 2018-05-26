<template>
    <div class="rules">
        <div class="rules-inner">
            <h1>How to play</h1>

            <ol>
            <li>Adjust your bet. Minimum bet is $5.</li>
            <li>Press Deal to start.</li>
            <li>Choose the cards you want to <strong>hold</strong>.</li>
            <li>Click draw and hope for the best.</li>
            <li>Repeat.</li>
            </ol>


            <p>You start with $100. If you go broke, your cash balance will reset to $100. You balance is stored in your browser’s localStorage between sessions.</p>

            <h2 id="Scoring">Scoring</h2>

            <table>
            <thead>
            <tr>
            <th style="text-align:left;"> Hand                       </th>
            <th style="text-align:right;"> Multiply bet by </th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td style="text-align:left;"> Royal Straight Flush       </td>
            <td style="text-align:right;">            x 60 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> Straight Flush             </td>
            <td style="text-align:right;">            x 30 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> Four of a Kind             </td>
            <td style="text-align:right;">            x 20 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> Full House                 </td>
            <td style="text-align:right;">            x 15 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> Flush                      </td>
            <td style="text-align:right;">            x 10 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> Straight                   </td>
            <td style="text-align:right;">            x  7 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> Three of a Kind            </td>
            <td style="text-align:right;">            x  3 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> Two Pair                   </td>
            <td style="text-align:right;">            x  2 </td>
            </tr>
            <tr>
            <td style="text-align:left;"> One Pair (Jacks or better) </td>
            <td style="text-align:right;">            x  1 </td>
            </tr>
            </tbody>
            </table>

            <button class="rules-close" @click="close">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$emit('close-rules');
        }
    }
}
</script>
