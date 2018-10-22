// const Child = (props) => <div>
// 	<h1>SadMan Child</h1>
// </div>

// const Test = (props) => {
// 	return (
// 		<div>
// 			<h1>{props.str}</h1>
// 			<div>
// 				{
// 					props.ary.map((val, index) => {
// 						return (
// 							<li key={index}>{val}</li>
// 						)
// 					})
// 				}
// 				{
// 					props.arrObj.map((val) => {
// 						return (
// 							<li key={val.id}>{val.name}</li>
// 						)
// 					})
// 				}
// 			</div>
// 			{props.children}
// 		</div>
// 		)
// }

// Test.propTypes = {
// 	str: PropTypes.string,
// 	strOrNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// 	ary:PropTypes.arrayOf(PropTypes.number),
// 	arrObj: PropTypes.arrayOf(PropTypes.shape(
// 		{
// 			name: PropTypes.string, 
// 			age: PropTypes.number
// 		}
// 	)),
// 	children: PropTypes.object
// }

// let myPromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('Good to go');
// 	}, 1000);//in ms

// });

// let myPromise2  = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('Promise 2 - the promising');
// 	}, 1500);
// });

// // Only Resolve if all promises resolve, else it error and we will catch
// Promise.all([myPromise.catch.length, myPromise2])
// 	.then((data) => {
// 		console.log(data)
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	})

// fetch('http://api.icndb.com/jokes/random/10')
// 	.then((res) => {
// 		res.json().then((data) => {
// 			console.log(data)
// 		});
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	})

		// var ObjectList = this.state.MediaObject.map((currentObj, index) => {
		// 	return (
		// 		<ResultObj 
		// 		key={index}
		// 		name={currentObj.name}
		// 		rType={this.props.currentMediaTap}
		// 		className="mainMediaObject"
		// 		handleMClick={this.onUpdateMediaType}/>
		// 	)
		// });


		/*
test("mock implementation", () => {
  const mock = jest.fn(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
  expect(mock).toHaveBeenCalled();
});

test("also mock implementation", () => {
  const mock = jest.fn().mockImplementation(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock implementation one time", () => {
  const mock = jest.fn().mockImplementationOnce(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");

  expect(mock("baz")).toBe(undefined);
  expect(mock).toHaveBeenCalledWith("baz");
});

test("mock return value", () => {
  const mock = jest.fn();
  mock.mockReturnValue("bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock promise resolution", () => {
  const mock = jest.fn();
  mock.mockResolvedValue("bar");

  expect(mock("foo")).resolves.toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});*/